# Arquitectura

Sitio estático multipágina servido tal cual por GitHub Pages (`.nojekyll`: sin procesamiento Jekyll). Cada página HTML carga su CSS y **un** módulo de entrada (`<script type="module" src="…/<nombre>.page.js">`). El contenido vive en el HTML (SEO, funciona sin JS); el JS lo mejora.

## Lista cerrada de carpetas

Nadie (persona o IA) crea carpetas fuera de esta lista sin aprobación del dev. Si una tarea necesita una nueva, va a "Decisiones a confirmar" del plan.

```
/                          index.html y páginas legado; configs; AGENTS.md, CLAUDE.md
pages/                     páginas nuevas: pages/<nombre>.html
assets/img/                imágenes (nuevas en kebab-case)
assets/vendor/             librerías de terceros copiadas (no se editan)
assets/css/, assets/js/    LEGADO (ver abajo)
scripts/                   scripts de Node para tooling (hooks); nunca código del sitio
src/core/                  config, http, logger, store base, theme-init
src/shared/components/     componentes reutilizados por 2+ features
src/shared/utils/          funciones puras (formato, validación, fechas)
src/features/<nombre>/     un feature: <nombre>.page.js, components/, services/, state.js, <nombre>.css
src/i18n/                  diccionarios de idioma (en.js, es.js) e i18n runtime
src/styles/                tokens.css, base.css, themes.css
tests/                     espejo de src/ (tests/core, tests/shared/utils, tests/features/<f>)
docs/ai/                   documentación para IA y devs; docs/ai/workflows/
docs/specs/                specs y planes: docs/specs/NNN-nombre-corto/
.claude/, .cursor/         commands y hooks de IA
```

Dentro de `src/features/<nombre>/` solo existen: `<nombre>.page.js`, `<nombre>.css`, `state.js`, `components/`, `services/`. Nada más sin aprobación.

## Capas y dependencias permitidas

```
pages/*.html ──> features/<f>/<f>.page.js ──> features/<f>/{components,state,services}
                                         └──> shared/{components,utils}, i18n, core
features/<f>/services/ ──> core/http.js
shared/ ──> core/          (nunca features/)
i18n/   ──> core/          (nunca features/)
core/   ──> nada del proyecto salvo core/
```

| Desde \ Hacia | core | shared | i18n | mismo feature | otro feature |
| ------------- | ---- | ------ | ---- | ------------- | ------------ |
| core          | ✅   | ❌     | ❌   | ❌            | ❌           |
| shared        | ✅   | ✅     | ✅   | ❌            | ❌           |
| i18n          | ✅   | ✅     | ✅   | ❌            | ❌           |
| feature       | ✅   | ✅     | ✅   | ✅            | ❌           |

- `core → shared/features` y `shared/i18n → features` lo bloquea ESLint (`no-restricted-imports`).
- `feature → otro feature` no es detectable de forma fiable por ruta relativa: se revisa en `/review`. Si dos features necesitan lo mismo, se mueve a `shared/`.
- Solo `core/http.js` usa `fetch` (lint). Solo `core/logger.js` usa `console` (lint).

## Responsabilidades

| Archivo             | Hace                                                                | No hace                            |
| ------------------- | ------------------------------------------------------------------- | ---------------------------------- |
| `<f>.page.js`       | Busca los nodos raíz, llama a `initX`, conecta estado ↔ componentes | Lógica de negocio, fetch, formateo |
| `components/*.js`   | Renderiza y despacha acciones (`initX(root)`, `createX(props)`)     | Calcular, filtrar, pedir datos     |
| `state.js`          | Estado del feature, acciones y getters derivados (puros, con test)  | Tocar el DOM                       |
| `services/*.js`     | Llamar a `core/http.js` y mapear la respuesta al modelo del feature | Tocar el DOM o el estado           |
| `shared/utils/*.js` | Funciones puras, con test                                           | Efectos secundarios                |

## Legado

Heredado de la plantilla original y **excluido** de lint y Prettier hasta su spec de migración:

- `index.html`, `portfolio-details.html` (tienen `style=""` inline y scripts clásicos).
- `assets/js/main.js` (IIFE, no ES module).
- `assets/css/style.css` (colores hex sueltos).

Reglas: no se refactoriza legado como efecto colateral de otra tarea. Cuando una spec lo migra, al terminar se quita su exclusión de `.prettierignore` / configs de lint. Sí se puede editar el HTML legado para enlazar CSS o módulos nuevos si la spec lo pide.

## Nombres

- kebab-case para archivos y carpetas. Excepción: archivos estándar (`AGENTS.md`, `CLAUDE.md`, `README.md`) y `_template/`.
- Specs: `docs/specs/NNN-nombre-corto/` con `NNN` incremental (`001`, `002`…).
- Sufijos: `*.page.js` (entrada de página), `*.test.js` (tests).
