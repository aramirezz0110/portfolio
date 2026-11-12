# AGENTS.md

Portfolio personal de Arom Mauricio Ramirez Zambrana (Flutter & Unity developer). Sitio **estático multipágina** publicado en GitHub Pages desde `master` (`https://aramirezz0110.github.io/portfolio/`). Sin bundler, sin framework, sin API.

Este archivo es corto a propósito: el detalle vive en `docs/ai/`. Léelo antes de tocar código.

## Stack

- HTML + CSS + JavaScript vanilla (**ES modules nativos**, `<script type="module">`).
- Bootstrap 5.1 (grilla y utilidades), GLightbox, Isotope e íconos: copiados en `assets/vendor/` (sin npm).
- Node 26 LTS (`.nvmrc`) solo para herramientas: ESLint, Stylelint, HTMLHint, Prettier, Vitest + jsdom.
- Idioma por defecto: **inglés** (siempre, sin importar el dispositivo). Tema por defecto: **oscuro** (siempre).

## Comandos

| Comando                | Qué hace                                      |
| ---------------------- | --------------------------------------------- |
| `npm run dev`          | Servidor local en `http://localhost:8765`     |
| `npm run lint`         | ESLint + Stylelint + HTMLHint                 |
| `npm run format`       | Prettier (escribe)                            |
| `npm run format:check` | Prettier (solo verifica)                      |
| `npm run test`         | Vitest (jsdom)                                |
| `npm run check`        | Todo lo anterior (lint + format:check + test) |

No hay `build`: lo que está en el repo es lo que se publica. Instala con `npm ci` (nunca `npm install <pkg>` sin aprobación).

## Flujo SDD (obligatorio)

**spec → plan → implement → verify**, con aprobación del dev entre cada paso. Nada se implementa sin spec y plan `approved`.

| Tipo de tarea                         | Pasos                                                               |
| ------------------------------------- | ------------------------------------------------------------------- |
| Feature nuevo o rediseño              | `/spec` → `/plan` → `/implement` → `/verify` → revisión → `/commit` |
| Página nueva en feature existente     | `/spec` (corta) → `/plan` → `/implement` → `/verify` → `/commit`    |
| Solo UI, sin lógica nueva             | `/implement-ui` → `/commit`                                         |
| Bugfix                                | `/bugfix` → `/commit`                                               |
| Cambio chico (texto, color, un campo) | Directo y `/commit`                                                 |

Specs en `docs/specs/NNN-nombre-corto/`. Procedimientos en `docs/ai/workflows/`.

## Definición de done

1. `npm run lint` y `npm run format:check` sin errores.
2. `npm run test` en verde; toda lógica nueva (utils, state, services con `fetch` mockeado) tiene test.
3. UI: loading, error, vacío, responsive (móvil y escritorio), teclado y modo claro/oscuro revisados.
4. La tarea termina cuando el dev la revisa y la aprueba, no cuando pasan los checks.

## Nunca

- Implementar sin spec y plan aprobados (salvo los atajos de la tabla de arriba).
- Hacer commit o push: se propone el mensaje y el dev decide.
- Variables globales, `<script>` inline, `on*=` ni `style=` inline. Única excepción: `src/core/theme-init.js` (script clásico en `<head>`, ver `docs/ai/ui-conventions.md`).
- `innerHTML`, `outerHTML`, `insertAdjacentHTML` o `document.write` (XSS). Usa `textContent`, `createElement` o `escapeHtml`.
- `fetch` fuera de `src/core/http.js`; páginas y componentes llaman a `features/<f>/services/`.
- `console.*` fuera de `src/core/logger.js`. Nunca loguear tokens ni datos personales.
- Secretos en el código: todo el front es público. Hosts y constantes en `src/core/config.js`.
- Colores literales (hex, `rgb()`, nombres) fuera de `src/styles/tokens.css`. Siempre `var(--…)`.
- Lógica en el DOM: filtrar, formatear o calcular va en funciones puras (`shared/utils/`, `state.js`) con test.
- Textos visibles fuera de su único lugar (el HTML en inglés; las traducciones en `src/i18n/`).
- Crear carpetas fuera de la lista cerrada de `docs/ai/architecture.md`.
- Agregar dependencias, refactorizar código ajeno a la tarea o tocar el legado (`assets/js`, `assets/css`, `index.html`, `portfolio-details.html`) sin que lo pida la spec.
- Inventar endpoints, datos, textos, reglas o navegación: se marca como pregunta y se toma la opción conservadora.

## Convenciones

- Archivos y carpetas en **kebab-case** (`project-card.js`, `001-modo-oscuro/`). Imports relativos con extensión `.js`.
- Componentes: `initX(root)` mejora HTML existente; `createX(props) → HTMLElement` crea UI nueva.
- CSS: BEM (`bloque__elemento--modificador`), un CSS por feature, sin ids en selectores.
- Ramas: `feat/nombre-corto`, `fix/nombre-corto`, `docs/…`, `chore/…`.
- Commits: Conventional Commits (`feat: …`, `fix: …`, `docs: …`, `chore: …`, `refactor: …`, `test: …`, `style: …`).
- Documentación y specs en **español**; código, identificadores y textos del sitio en inglés.

## Dónde mirar

| Tema                                     | Archivo                            |
| ---------------------------------------- | ---------------------------------- |
| Índice                                   | `docs/ai/README.md`                |
| Capas, carpetas permitidas, dependencias | `docs/ai/architecture.md`          |
| Componentes, CSS, tokens, temas, a11y    | `docs/ai/ui-conventions.md`        |
| Estado                                   | `docs/ai/state.md`                 |
| HTTP, services, errores                  | `docs/ai/data-layer.md`            |
| Config, secretos, npm seguro             | `docs/ai/env-and-secrets.md`       |
| Idiomas                                  | `docs/ai/i18n.md`                  |
| Tests                                    | `docs/ai/testing.md`               |
| Checklist de feature nuevo               | `docs/ai/new-feature-checklist.md` |
| Procedimientos (`/spec`, `/plan`…)       | `docs/ai/workflows/`               |
| Specs y plantillas                       | `docs/specs/`                      |
