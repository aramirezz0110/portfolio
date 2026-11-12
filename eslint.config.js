import js from '@eslint/js';
import globals from 'globals';

const LEGACY_AND_VENDOR = ['assets/**', 'node_modules/**', 'coverage/**'];

const UNSAFE_HTML_SINKS = [
  {
    property: 'innerHTML',
    message: 'XSS: usa textContent, createElement o escapeHtml (docs/ai/ui-conventions.md).',
  },
  { property: 'outerHTML', message: 'XSS: usa createElement / replaceWith.' },
  { property: 'insertAdjacentHTML', message: 'XSS: usa insertAdjacentElement / append.' },
  { object: 'document', property: 'write', message: 'Prohibido document.write.' },
];

export default [
  { ignores: LEGACY_AND_VENDOR },

  js.configs.recommended,

  // Código del sitio (navegador, ES modules)
  {
    files: ['src/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
    },
    rules: {
      'no-console': 'error',
      'no-restricted-properties': ['error', ...UNSAFE_HTML_SINKS],
      'no-restricted-globals': [
        'error',
        { name: 'fetch', message: 'Usa features/<f>/services/ → core/http.js.' },
      ],
      'no-var': 'error',
      'prefer-const': 'error',
      eqeqeq: ['error', 'always'],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },

  // Límites entre capas (docs/ai/architecture.md)
  {
    files: ['src/core/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/shared/**', '**/features/**'],
              message: 'core/ no depende de shared/ ni features/.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/shared/**/*.js', 'src/i18n/**/*.js'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            { group: ['**/features/**'], message: 'shared/ e i18n/ no dependen de features/.' },
          ],
        },
      ],
    },
  },
  // Feature → otro feature: no es detectable de forma fiable por ruta relativa; se revisa en /review.

  // Único lugar donde se permite fetch
  {
    files: ['src/core/http.js'],
    rules: { 'no-restricted-globals': 'off' },
  },

  // Excepción documentada: script clásico bloqueante en <head> para aplicar el tema antes de pintar
  {
    files: ['src/core/theme-init.js'],
    languageOptions: { sourceType: 'script' },
    rules: { 'no-restricted-globals': 'off' },
  },

  // Tests
  {
    files: ['tests/**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
    },
  },

  // Configs y scripts de Node
  {
    files: ['*.js', '*.mjs', 'scripts/**/*.mjs'],
    languageOptions: {
      sourceType: 'module',
      globals: { ...globals.node },
    },
  },
];
