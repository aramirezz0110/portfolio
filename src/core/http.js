import { config } from './config.js';

/**
 * Único punto del código que llama a fetch. Las páginas y componentes nunca lo usan directo:
 * features/<f>/services/ → core/http.js (ver docs/ai/data-layer.md).
 */

export class HttpError extends Error {
  constructor(status, body) {
    super(`HTTP ${status}`);
    this.name = 'HttpError';
    this.status = status;
    this.body = body;
  }
}

export class NetworkError extends Error {
  constructor(cause) {
    super('Network error', { cause });
    this.name = 'NetworkError';
  }
}

export class TimeoutError extends Error {
  constructor(timeoutMs) {
    super(`Request timed out after ${timeoutMs} ms`);
    this.name = 'TimeoutError';
    this.timeoutMs = timeoutMs;
  }
}

/**
 * @param {string} path Ruta relativa a config.apiBaseUrl, o URL absoluta.
 * @param {{ method?: string, body?: unknown, headers?: Record<string, string>,
 *           timeoutMs?: number, signal?: AbortSignal, baseUrl?: string }} [options]
 * @returns {Promise<unknown>} JSON parseado, texto, o null si la respuesta no tiene cuerpo.
 */
export async function request(path, options = {}) {
  const {
    method = 'GET',
    body,
    headers = {},
    timeoutMs = config.httpTimeoutMs,
    signal,
    baseUrl = config.apiBaseUrl,
  } = options;

  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const combinedSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;
  const hasBody = body !== undefined;

  let response;
  try {
    response = await fetch(new URL(path, baseUrl || globalThis.location?.href), {
      method,
      headers: {
        Accept: 'application/json',
        ...(hasBody && { 'Content-Type': 'application/json' }),
        ...headers,
      },
      body: hasBody ? JSON.stringify(body) : undefined,
      signal: combinedSignal,
    });
  } catch (error) {
    if (timeoutSignal.aborted) throw new TimeoutError(timeoutMs);
    if (error?.name === 'AbortError') throw error;
    throw new NetworkError(error);
  }

  const payload = await readBody(response);
  if (!response.ok) throw new HttpError(response.status, payload);
  return payload;
}

async function readBody(response) {
  if (response.status === 204) return null;
  const contentType = response.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) return response.json();
  const text = await response.text();
  return text === '' ? null : text;
}
