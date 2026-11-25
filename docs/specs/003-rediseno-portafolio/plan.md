# Plan: Rediseño del portafolio (posicionamiento Flutter + Unity + XR)

- **Estado:** approved <!-- draft | approved | in progress | done -->
- **Fecha:** 2026-11-25
- **Spec:** [spec.md](spec.md)

## Resumen

Todo se hace en `feat/portfolio-redesign`, una fase por commit (la IA propone el mensaje y el dev aprueba cada commit antes de seguir). La home sigue siendo `index.html`: se cambian textos, se reemplazan las tarjetas de proyectos y se agregan la sección Case Studies, la tarjeta "In progress" y los botones ocultos.

Las 3 páginas de caso viven en `pages/` y forman un feature nuevo, `case-study`, con su propio CSS y módulo de entrada. Como esas páginas necesitan la barra, el footer, los botones y los paneles que hoy están en `home.css`, esos bloques genéricos pasan a `base.css`, y `footer-year` pasa a `src/shared/components/`. El filtro de proyectos ya admite varias categorías por tarjeta, así que solo cambia el HTML.

La Fase 8 convierte las imágenes con `sips` (incluido en macOS, sin dependencias) y revisa los enlaces con un script temporal fuera del repo. Lighthouse lo mide el dev.

## Decisiones a confirmar

1. **Bloques genéricos de `home.css` a `base.css`:** `.site-header`, `.site-nav`, `.site-footer`, `.button`, `.section-panel`, `.section-heading`, `.social-links` y el fondo de `body`. Las páginas de caso los necesitan y un feature no puede depender de otro. Es un movimiento sin cambios visuales. Alternativa: que las páginas de caso carguen también `home.css` (acopla features y carga CSS que no usan).
2. **`footer-year.js` a `src/shared/components/`**, con su test a `tests/shared/components/`. Lo usarían dos features. Alternativa: año fijo en el HTML de los casos (queda viejo cada enero).
3. **Etiquetas de stack y marcador de imagen como bloques compartidos en `base.css`:** `.tag-list` / `.tag` y `.media-placeholder` (caja con `aspect-ratio` 16:9, color `--color-surface`, `aria-hidden="true"`, sin texto). Los usan la home y los casos.
4. **Rutas de las páginas de caso** (la lista cerrada no permite subcarpetas en `pages/`):
   - `pages/case-study-wordbox.html`
   - `pages/case-study-meta-quest-vr.html`
   - `pages/case-study-fintech-flutter.html`
5. **Plantilla reutilizable:** `docs/ai/case-study-template.md`, con el esqueleto HTML de los 6 bloques y los pasos para crear un caso nuevo. No se publica como página. Alternativa: `pages/case-study-template.html` con `noindex` (quedaría público).
6. **Botones ocultos** ("Play in browser", Google Play, repo, video y los 3 "Download CV"): `<a … hidden>` **sin `href`** y un comentario `<!-- TODO: … -->` arriba con lo que falta. Sin `href` no hay link roto ni foco aunque alguien quite el `hidden` por error.
7. **Textos que la spec no fija palabra por palabra.** Los redacté a partir de los CV. Si los apruebas, los agrego a la tabla de Textos de la spec en T0:
   - **About, párrafo 1:** "I'm a mobile developer with 7 years of experience across Flutter and Unity. I build production Flutter apps, currently payment features for a fintech platform, and I spent most of my career in Unity shipping games, VR and AR experiences with AR Foundation (ARCore on Android, ARKit on iOS), and features for a consumer app with more than 1.5 million downloads. Working in both lets me build apps that combine standard mobile flows with interactive 3D, AR or VR content."
   - **Servicio XR Development:** "Immersive experiences for Meta Quest and mobile AR with AR Foundation (ARCore on Android, ARKit on iOS)."
   - **Unity & XR (lista):** Unity · C# · 2D & 3D gameplay systems · AR Foundation (ARCore, ARKit) · OpenXR · Meta XR SDK · Meta Quest · Multiplayer (Photon) · Performance profiling & optimization.
   - **Tools & Practices (se agregan):** Spec-driven development · AGENTS.md · ADRs (architecture decision records) · Figma.
   - **Tarjetas de caso (una línea):**
     - Wordbox English: "Engagement features for an English-learning app with 1.5M+ downloads."
     - Meta Quest VR: "Rebuilding a VR training simulation for Meta Quest 2: up to 30% higher frame rate, 50% faster loads."
     - Fintech Flutter: "Payment flows, backend-driven screens and a feature-based architecture for a fintech app."
   - **Títulos de las páginas de caso:** "Wordbox English", "VR Training Simulation on Meta Quest 2", "Fintech App in Flutter". El de Meru no nombra a la empresa en el título; sí se nombra en "My role & team", igual que en Experience.
   - **Tarjeta "In progress":** título "Furniture AR app" y descripción "Flutter handles the catalog, login and cart; an embedded Unity module with AR Foundation places products in your real space."
8. **Contact sin teléfono:** quedan 3 tarjetas (Location, Email, Social) en `col-md-4` (3 columnas desde 768px). Así no queda hueco.

## Archivos

| Acción    | Ruta                                                    | Motivo                                                                        |
| --------- | ------------------------------------------------------- | ----------------------------------------------------------------------------- |
| modificar | `index.html`                                            | Todas las fases                                                               |
| modificar | `src/features/home/home.css`                            | Quitar bloques movidos (dec. 1); tarjeta "In progress", sección Case Studies  |
| modificar | `src/styles/base.css`                                   | Recibe los bloques genéricos, `.tag`, `.media-placeholder` (dec. 1 y 3)       |
| modificar | `src/features/home/home.page.js`                        | Importa `footer-year` desde `shared`                                          |
| mover     | `src/features/home/components/footer-year.js` → `src/shared/components/footer-year.js` | Dec. 2                                         |
| mover     | `tests/features/home/footer-year.test.js` → `tests/shared/components/footer-year.test.js` | Dec. 2                                       |
| crear     | `src/features/case-study/case-study.page.js`            | Entrada de las páginas de caso (solo `initFooterYear`)                        |
| crear     | `src/features/case-study/case-study.css`                | Layout de los 6 bloques, galería, CTA                                         |
| crear     | `pages/case-study-wordbox.html`                         | Caso 1                                                                        |
| crear     | `pages/case-study-meta-quest-vr.html`                   | Caso 2                                                                        |
| crear     | `pages/case-study-fintech-flutter.html`                 | Caso 3                                                                        |
| crear     | `docs/ai/case-study-template.md`                        | Plantilla reutilizable (dec. 5)                                               |
| modificar | `docs/ai/README.md`                                     | Enlazar la plantilla                                                          |
| crear     | `assets/cv/.gitkeep`                                    | Carpeta para los PDF (aprobada en la spec)                                    |
| modificar | `docs/ai/architecture.md`                               | Agregar `assets/cv/` a la lista cerrada                                       |
| borrar    | 11 imágenes en `assets/img/portfolio/`                  | Proyectos retirados (spec Fase 2)                                             |
| crear     | `*.webp` de las imágenes que quedan, `bg3.webp`         | Fase 8; se borran los PNG/JPG reemplazados                                    |
| conservar | `assets/img/me2.jpg`                                    | `og:image` y `apple-touch-icon` (WebP tiene soporte irregular en previews)    |

## UI

### `index.html`

```
header.site-header        (base.css) nav + "Case Studies"
main
├── #hero                 h1 nombre · p.hero__title (titular nuevo) · intro · [View case studies][Book a call] · social
├── #about                texto nuevo (dec. 7)
├── #case-studies (nueva) .section-panel > .row > 3 × article.case-card
│                         └── título · una línea · .tag-list · "Read case study"
├── #experience           sin cambios
├── #portfolio            filtro All / Flutter / XR
│   └── 5 × article.project-card (data-categories="flutter xr" | "xr")
│       ├── img | .media-placeholder ("In progress")
│       ├── título · .project-card__badge "In progress" (solo Fase 4) · línea de valor · .tag-list
│       └── links: Code / Video / Zoom · Play in browser (hidden) · Google Play / Repo / Video (hidden)
├── #skills               Unity & XR y Tools actualizados
├── #services             XR actualizado + "Flutter + Unity Integration" (7 tarjetas)
├── #education            sin cambios
└── #contact              [Email me][Book a call] · Download CV ×3 (hidden) · 3 tarjetas
footer.site-footer        (base.css)
```

### `pages/case-study-*.html`

```
header.site-header        marca → ../index.html · link "Back to portfolio" → ../index.html#case-studies (sin hamburguesa)
main.case-study
├── header                h1 título · .tag-list
├── section × 6           Context & problem · My role & team · Technical & design decisions · Results · Stack · Gallery
│   └── Gallery           .media-placeholder × 2 (hasta que haya imágenes)
└── .case-study__cta      [Book a call]
footer.site-footer
```

- **Reutiliza:** `.button`, `.section-panel`, `.section-heading`, `.site-header`, `.site-footer`, `.social-links` (movidos a `base.css`); `.project-card` y el filtro sin cambios de JS.
- **Tokens nuevos:** ninguno. Badge "In progress" con `--color-accent` / `--color-on-accent`; `.tag` con `--color-surface` y `--color-text-muted`.
- **Responsive:** tarjetas de caso 1 / 2 / 3 columnas (móvil / tablet / escritorio); páginas de caso en una columna de lectura (`max-width` en `case-study.css`).

## Estado

No aplica. El estado del filtro (`createProjectFilterState`) se reutiliza tal cual.

## Datos

Contenido estático en HTML. Calendly e itch.io son enlaces externos.

## Tests

| Archivo de test                                 | Qué cubre                                                        |
| ----------------------------------------------- | ---------------------------------------------------------------- |
| `tests/shared/components/footer-year.test.js`   | El mismo test, en su nueva ruta                                  |
| `tests/features/home/project-filter.test.js`    | Fixture con categorías `flutter` / `xr` y una tarjeta con ambas  |
| `tests/features/home/state.test.js`             | Sin cambios (la lógica no cambia)                                |

No hay lógica nueva: el resto se verifica a mano (responsive, teclado, enlaces) en `/verify`.

## Tareas

Cada fase termina con `npm run check`, un resumen al dev y un mensaje de commit propuesto. No se empieza la siguiente sin su aprobación.

**Fase 0 — Documentos**

- [ ] **T0 · Spec y plan** — `spec.md` (textos aprobados de la dec. 7), `plan.md`. Listo cuando: ambos `approved` y commit `docs: add spec and plan for portfolio redesign`.

**Fase 1 — Hero y posicionamiento**

- [ ] **T1 · Metas** — `index.html` `<head>`. Listo cuando: `description` y `og:description` dicen "7 years".
- [ ] **T2 · Hero** — `index.html`. Listo cuando: titular nuevo, intro con "7 years", botones "View case studies" (`#case-studies`) y "Book a call" (Calendly, `target="_blank" rel="noopener noreferrer"`). La sección llega en la Fase 3: hasta entonces el botón no hace scroll (la rama no se publica antes del merge).
- [ ] **T3 · About** — `index.html`. Listo cuando: párrafo de la dec. 7 y `grep -r "6+"` no encuentra nada en el sitio.

**Fase 2 — Limpieza de proyectos**

- [ ] **T4 · Quitar 11 tarjetas y sus imágenes** — `index.html`, `assets/img/portfolio/`. Listo cuando: quedan 4 tarjetas y ninguna imagen sin uso.
- [ ] **T5 · Tarjetas nuevas** — `index.html`, `home.css`, `base.css` (`.tag`). Listo cuando: cada tarjeta tiene línea de valor, etiquetas y al menos un link.
- [ ] **T6 · Filtro All / Flutter / XR** — `index.html`, `tests/features/home/project-filter.test.js`. Listo cuando: filtra con mouse y teclado y el test pasa.

**Fase 3 — Casos de estudio**

- [ ] **T7 · Mover bloques compartidos** — `home.css` → `base.css`, `footer-year` → `shared`. Listo cuando: la home se ve igual que antes (captura antes/después) y los tests pasan.
- [ ] **T8 · Feature `case-study` y plantilla** — `src/features/case-study/*`, `docs/ai/case-study-template.md`. Listo cuando: la plantilla tiene los 6 bloques y los pasos.
- [ ] **T9 · Tres páginas de caso** — `pages/case-study-*.html`. Listo cuando: datos de la spec, TODO donde falta, marcadores de imagen, metas propias y CTA a Calendly.
- [ ] **T10 · Sección Case Studies y nav** — `index.html`, `home.css`. Listo cuando: 3 tarjetas enlazan a sus páginas y el nav marca la sección activa.

**Fase 4 — Proyecto de Flutter**

- [ ] **T11 · Tarjeta "In progress"** — `index.html`, `home.css`. Listo cuando: badge visible, `data-categories="flutter xr"`, marcador de imagen y 3 links ocultos con TODO.

**Fase 5 — Demos jugables**

- [ ] **T12 · "Play in browser" oculto** — `index.html`. Listo cuando: las 4 tarjetas de Unity lo tienen oculto, sin `href` y con TODO.

**Fase 6 — Skills y servicios**

- [ ] **T13 · Skills** — `index.html`. Listo cuando: Unity & XR y Tools & Practices coinciden con la dec. 7.
- [ ] **T14 · Servicios** — `index.html`. Listo cuando: XR Development actualizado y "Flutter + Unity Integration" agregado.

**Fase 7 — Contacto y privacidad**

- [ ] **T15 · Quitar teléfono** — `index.html`. Listo cuando: `grep -rn "tel:\|69792487"` no encuentra nada fuera de `docs/`.
- [ ] **T16 · Book a call y Download CV** — `index.html`, `assets/cv/.gitkeep`, `docs/ai/architecture.md`. Listo cuando: Calendly visible y los 3 botones de CV ocultos con TODO de ruta.
- [ ] **T17 · Revisión contra los CV** — `index.html`, páginas de caso. Listo cuando: tabla de comparación en el resumen de la fase, sin diferencias.

**Fase 8 — Calidad técnica**

- [ ] **T18 · Imágenes a WebP** — `assets/img/`, `index.html`, `home.css` / `base.css` (fondo). Listo cuando: ninguna imagen del sitio salvo `me2.jpg` y `favicon2.png` en PNG/JPG; `width`/`height` correctos.
- [ ] **T19 · SEO y alt** — todas las páginas. Listo cuando: cada página tiene `title`, `description`, `canonical`, `og:*`; toda `<img>` tiene `alt` y `loading="lazy"` bajo el pliegue.
- [ ] **T20 · Enlaces rotos** — script temporal en el scratchpad (no se agrega al repo). Listo cuando: todos los enlaces internos y externos responden.
- [ ] **T21 · Lighthouse** — el dev mide home y un caso. Listo cuando: ≥ 90 en Performance, Accessibility y SEO o, si no, una lista de causas con su corrección.

## Desvíos

<!-- Cambios respecto al plan aprobado: qué, por qué, aprobado el AAAA-MM-DD. -->

- **T2 (Fase 1):** `.hero__title span` pasa de `border-bottom` a `text-decoration: underline` en `home.css`. Con el titular nuevo en dos o más líneas, el borde pisaba la línea siguiente en móvil. Solo "Flutter & Unity Developer" va subrayado; el resto del titular sigue en texto normal. Aprobado el 2026-11-25 (commit de la Fase 1).
- **T6 (Fase 2):** el filtro queda en **All / XR** hasta la Fase 4. Las 4 tarjetas de esta fase son XR y un botón "Flutter" sin tarjetas rompería "ningún filtro queda vacío" (CA6). El botón "Flutter" se agrega en T11 junto con la tarjeta "In progress". Aprobado el 2026-11-25.
- **T5 (Fase 2):** se quita `.project-card__category` (la etiqueta "Unity VR" de cada tarjeta) porque las etiquetas de stack la reemplazan. Aprobado el 2026-11-25 (commit de la Fase 2); igual que T6.
- **T7 (Fase 3):** `.social-links` se queda en `home.css`: las páginas de caso no lo usan. Se borra `pages/.gitkeep` porque la carpeta ya tiene archivos. Aprobado el 2026-11-25.
- **T9 (Fase 3):** en `case-study.css`, los títulos de bloque usan `line-height: 1.4` y ocultan la línea decorativa bajo 576px; con títulos largos la línea se montaba sobre el texto en móvil. Aprobado el 2026-11-25.
- **T15 (Fase 7):** las 3 tarjetas de Contact usan `col-lg-4` (no `col-md-4`): a 768px el email se salía de la tarjeta y los íconos sociales se partían. Debajo de 992px quedan apiladas, sin hueco. El bloque "Download CV" entero queda oculto (no solo los botones) para que no se vea la etiqueta sola. Pendiente de aprobación del dev.
