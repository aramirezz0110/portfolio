# Convenciones de UI

## Componentes

Patrón: **mejora progresiva** con funciones. Sin Web Components con Shadow DOM: aislarían los estilos de los tokens globales y de Bootstrap.

- **`initX(root, deps?) → { destroy() }`** — toma HTML que ya existe en la página y le agrega comportamiento (listeners, estado). Es el caso más común: el contenido está en el HTML para SEO.
- **`createX(props) → HTMLElement`** — crea UI que no existe en el HTML (listas generadas, toasts, modales). Construye con `document.createElement` y `textContent`.
- Un componente por archivo, nombre en kebab-case: `components/project-card.js` exporta `createProjectCard`.
- Los componentes no calculan ni piden datos: reciben datos ya listos y emiten acciones (callbacks en `props` o `CustomEvent`).
- Selección de nodos por `data-*` (`data-js="theme-toggle"`), no por clases de estilo: el CSS puede cambiar sin romper el JS.

## HTML

- Semántico: `header`, `nav`, `main`, `section` con encabezado, `footer`, `button` para acciones y `a` para navegación.
- Sin `style=""`, `on*=""` ni `<script>` inline (HTMLHint). Scripts: `<script type="module" src="…">`.
- **Excepción documentada:** `src/core/theme-init.js` se carga como script clásico, bloqueante, en `<head>`, para aplicar el tema guardado antes del primer pintado (los módulos son diferidos y causarían un parpadeo).
- Imágenes con `alt` (vacío solo si son decorativas), `width`/`height` y `loading="lazy"` debajo del pliegue.
- Enlaces externos: `target="_blank" rel="noopener noreferrer"`.

## XSS

Nunca `innerHTML`, `outerHTML`, `insertAdjacentHTML` ni `document.write` (lint). Usa `textContent`, `createElement`, `append`. Si de verdad hay que armar HTML como cadena, escapa cada dato con `shared/utils/escape-html.js`.

## CSS

- **BEM** en kebab-case: `.project-card`, `.project-card__title`, `.project-card--featured` (lint).
- Un CSS por feature: `features/<f>/<f>.css`. Los compartidos junto a su componente en `shared/components/`.
- Sin ids en selectores, sin `!important` (lint).
- Bootstrap se usa para grilla (`container`, `row`, `col-*`) y utilidades de layout. No se sobrescriben clases de Bootstrap: se crea un bloque BEM propio.
- Orden de carga en cada página: vendor → `src/styles/tokens.css` → `themes.css` → `base.css` → CSS del feature.

## Tokens

Definidos en `src/styles/tokens.css` (único archivo con colores literales; lint):

- **Primitivos** `--palette-*`: la paleta cruda. No se usan en componentes.
- **Semánticos** `--color-*`, `--space-*`, `--font-*`, `--radius-*`, `--shadow-*`, `--duration-*`: lo único que usan los componentes.
- ¿Falta un token? Se agrega en `tokens.css` (y su valor claro en `themes.css`) y se anota en el plan, sección "Tokens nuevos". Nunca un valor suelto.

## Temas (claro / oscuro)

- **Por defecto: oscuro**, siempre, independiente de `prefers-color-scheme`.
- `:root` en `tokens.css` = tema oscuro. `:root[data-theme='light']` en `themes.css` reasigna semánticos a primitivos (sin colores literales).
- La elección del usuario se guarda en `localStorage` (`config.storageKeys.theme`) y la aplica `theme-init.js` en `<head>`. Sin preferencia guardada → oscuro.
- Todo criterio de aceptación con UI se revisa en **ambos** temas.

## Responsive

- Mobile-first. Breakpoints (los mismos de Bootstrap y del legado): `768px` (md), `992px` (lg), `1024px` (xl). En `@media` se escriben literales (las custom properties no funcionan en media queries).
- Navegadores objetivo: las últimas 2 versiones de Chrome, Edge, Firefox y Safari (desktop e iOS/Android).
- Sin scroll horizontal a 320px de ancho.

## Estados

Toda UI que dependa de datos o acciones asíncronas define:

| Estado  | Cómo se ve                                                              |
| ------- | ----------------------------------------------------------------------- |
| loading | Skeleton con las dimensiones del contenido final (sin saltos de layout) |
| error   | Mensaje claro + acción de reintento si tiene sentido; `role="alert"`    |
| vacío   | Mensaje explicando que no hay contenido (no un hueco en blanco)         |
| éxito   | El contenido; si fue una acción, confirmación con `aria-live="polite"`  |

## Accesibilidad (objetivo WCAG 2.1 AA)

- Todo se usa con teclado; orden de foco lógico; foco visible (`:focus-visible` con `--focus-ring`).
- Contraste mínimo 4.5:1 texto normal y 3:1 texto grande/íconos, **en ambos temas**.
- Íconos solos llevan `aria-label` (o texto `.visually-hidden`); íconos decorativos `aria-hidden="true"`.
- Inputs con `<label>`; errores asociados con `aria-describedby`.
- Respetar `prefers-reduced-motion` (ya en `base.css`).
- `<html lang>` refleja el idioma activo.
