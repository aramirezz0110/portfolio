/**
 * Configuración pública del sitio. Todo lo que está aquí llega al navegador:
 * nunca pongas secretos (ver docs/ai/env-and-secrets.md).
 */
const hostname = globalThis.location?.hostname ?? '';

export const config = Object.freeze({
  siteUrl: 'https://aramirezz0110.github.io/portfolio/',
  /** El sitio no consume APIs hoy. Si aparece una, su host se define aquí. */
  apiBaseUrl: '',
  /** Idioma por defecto, independiente del idioma del dispositivo. */
  defaultLocale: 'en',
  supportedLocales: Object.freeze(['en', 'es']),
  /** Tema por defecto, independiente de prefers-color-scheme. */
  defaultTheme: 'dark',
  storageKeys: Object.freeze({
    theme: 'portfolio:theme',
    locale: 'portfolio:locale',
  }),
  httpTimeoutMs: 10_000,
  isDev: hostname === 'localhost' || hostname === '127.0.0.1',
});
