import { afterEach, describe, expect, it, vi } from 'vitest';
import { HttpError, NetworkError, TimeoutError, request } from '../../src/core/http.js';

const BASE = 'https://api.example.test/';

function jsonResponse(body, init = {}) {
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: { 'content-type': 'application/json' },
    ...init,
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('request', () => {
  it('devuelve el JSON parseado en una respuesta exitosa', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ ok: true }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(request('items', { baseUrl: BASE })).resolves.toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(String(fetchMock.mock.calls[0][0])).toBe('https://api.example.test/items');
  });

  it('serializa el body como JSON', async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 204 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(
      request('items', { baseUrl: BASE, method: 'POST', body: { a: 1 } }),
    ).resolves.toBeNull();
    const init = fetchMock.mock.calls[0][1];
    expect(init.body).toBe('{"a":1}');
    expect(init.headers['Content-Type']).toBe('application/json');
  });

  it('lanza HttpError con status y cuerpo cuando la respuesta no es ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(jsonResponse({ code: 'NOT_FOUND' }, { status: 404 })),
    );

    const error = await request('missing', { baseUrl: BASE }).catch((e) => e);
    expect(error).toBeInstanceOf(HttpError);
    expect(error.status).toBe(404);
    expect(error.body).toEqual({ code: 'NOT_FOUND' });
  });

  it('lanza NetworkError cuando fetch falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));

    await expect(request('items', { baseUrl: BASE })).rejects.toBeInstanceOf(NetworkError);
  });

  it('lanza TimeoutError cuando se supera el timeout', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(
        (_url, { signal }) =>
          new Promise((_resolve, reject) => {
            signal.addEventListener('abort', () => reject(signal.reason));
          }),
      ),
    );

    await expect(request('slow', { baseUrl: BASE, timeoutMs: 10 })).rejects.toBeInstanceOf(
      TimeoutError,
    );
  });
});
