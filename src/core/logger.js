/* eslint-disable no-console -- único punto del código autorizado a usar console */
import { config } from './config.js';

/**
 * Logger del sitio. En producción solo emite warn y error.
 * Nunca registres tokens, emails, teléfonos ni otros datos personales.
 */
const LEVELS = Object.freeze({ debug: 10, info: 20, warn: 30, error: 40 });

export function createLogger(scope, { minLevel = config.isDev ? 'debug' : 'warn' } = {}) {
  const threshold = LEVELS[minLevel];
  const emit = (level, method) => (message, context) => {
    if (LEVELS[level] < threshold) return;
    const prefix = `[${scope}]`;
    if (context === undefined) console[method](prefix, message);
    else console[method](prefix, message, context);
  };

  return Object.freeze({
    debug: emit('debug', 'debug'),
    info: emit('info', 'info'),
    warn: emit('warn', 'warn'),
    error: emit('error', 'error'),
  });
}
