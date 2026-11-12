# Plan: Contenido y estructura del portfolio

- **Estado:** done <!-- draft | approved | in progress | done -->
- **Fecha:** 2026-11-12
- **Spec:** [spec.md](spec.md)

## Resumen

Se reescribe el contenido de `index.html` según la spec y se pasa a scroll continuo. El comportamiento del legado `assets/js/main.js` (secciones que se reemplazan, menú, filtros con Isotope, lightbox) se reemplaza por un feature nuevo **`src/features/home/`** en ES modules, con su lógica pura testeada. Eso permite **borrar `main.js`**.

El aspecto se mantiene igual: se **reutilizan las clases del CSS legado** donde la estructura no cambia (`resume-item`, `section-title`, `icon-box`, `info-box`, `about-me`). Lo nuevo (barra fija, hero con botones, cifras, tarjetas de proyecto, footer) va en `home.css` usando tokens, cuyos valores ya coinciden con la paleta actual.

La barra de navegación queda dentro del feature `home`. Se moverá a `shared/` cuando una segunda página la necesite.

## Decisiones a confirmar

1. **Borrar `assets/js/main.js` completo.** Todo lo que hace se reemplaza en `src/features/home/`. Esto adelanta buena parte de la spec futura `005-migrar-main-js`. Los filtros dejan de usar Isotope (se muestran y ocultan tarjetas con el atributo `hidden`), así que se pierde la animación de reordenamiento.
2. **Editar el legado `assets/css/style.css`.** Se borran las reglas que ocultan secciones (`section` absoluto con `opacity: 0`, `.section-show`), las del header en modo hero/top, las del menú, Interests, Counts/Testimonials (sin uso), los estilos de hover de `.portfolio-wrap` y `#portfolio-flters`. Sin esto, el scroll continuo no es posible.
3. **Enlazar solo `src/styles/tokens.css`** en `index.html`. No se enlazan `base.css` ni `themes.css`, porque el reset cambiaría el aspecto; quedan para la spec `002-tokens-y-estilos`.
4. **Incorporar `index.html` a lint y formato.** Se quita de `.prettierignore` y `lint:html` pasa a incluirlo. Como el archivo se reescribe casi entero y la sección Interests (con los 12 `style=""`) desaparece, puede cumplir las reglas desde ya.
5. **Borrar librerías de `assets/vendor/` que quedan sin uso:** `isotope-layout`, `swiper`, `purecounter`, `php-email-form` y `remixicon`. Solo las usaban `main.js`, `portfolio-details.html` o la sección Interests. Se mantienen `bootstrap`, `bootstrap-icons`, `boxicons` y `glightbox`.
6. **Ubicación futura del CV** (no se crea ahora; el botón no existe hasta tener el PDF): `assets/docs/arom-ramirez-cv.pdf`. Cuando llegue el PDF, se agrega `assets/docs/` a la lista cerrada de carpetas y el botón "Download CV" en el hero, como cambio chico.

## Archivos

| Acción    | Ruta                                                                          | Motivo                                                                                          |
| --------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| modificar | `index.html`                                                                  | Contenido, orden de secciones, barra fija, hero, scripts y estilos enlazados                    |
| modificar | `assets/css/style.css`                                                        | Quitar reglas de secciones ocultas, header hero/top, menú, Interests y portfolio hover (dec. 2) |
| crear     | `src/features/home/home.page.js`                                              | Entrada del módulo: inicializa componentes y GLightbox                                          |
| crear     | `src/features/home/home.css`                                                  | Barra fija, hero, botones, cifras, tarjetas de proyecto, filtros, CTA de Services, footer       |
| crear     | `src/features/home/state.js`                                                  | Lógica pura: alias de anclas, sección activa, visibilidad por filtro; estado del filtro         |
| crear     | `src/features/home/components/site-nav.js`                                    | `initSiteNav`: menú móvil, sección activa, anclas antiguas                                      |
| crear     | `src/features/home/components/project-filter.js`                              | `initProjectFilter`: botones de filtro accesibles                                               |
| crear     | `src/features/home/components/footer-year.js`                                 | `initFooterYear`: año actual en el footer                                                       |
| crear     | `tests/features/home/state.test.js`                                           | Tests de la lógica pura                                                                         |
| crear     | `tests/features/home/site-nav.test.js`                                        | Tests del menú (jsdom)                                                                          |
| crear     | `tests/features/home/project-filter.test.js`                                  | Tests de filtros (jsdom)                                                                        |
| crear     | `tests/features/home/footer-year.test.js`                                     | Test del año                                                                                    |
| modificar | `.prettierignore`, `package.json`                                             | Incluir `index.html` en formato y `lint:html` (dec. 4)                                          |
| modificar | `docs/ai/architecture.md`                                                     | Reflejar que `main.js` ya no existe y que `index.html` dejó de ser legado                       |
| borrar    | `assets/js/main.js`                                                           | Reemplazado por `src/features/home/` (dec. 1)                                                   |
| borrar    | `portfolio-details.html`                                                      | Página de plantilla sin uso (spec)                                                              |
| borrar    | `assets/vendor/{isotope-layout,swiper,purecounter,php-email-form,remixicon}/` | Sin uso (dec. 5)                                                                                |

## UI

### `index.html`

```
body
├── header.site-header (fija)                          nuevo · home.css
│   ├── a.site-header__brand "Arom Ramirez" → #hero
│   ├── button.site-header__toggle (móvil)             nuevo · bi-list / bi-x
│   └── nav.site-nav > ul > a × 7                      nuevo · aria-current en la activa
├── main
│   ├── section#hero                                   nuevo · home.css
│   │   ├── h1 nombre · p titular · p presentación
│   │   ├── .hero__actions: "View projects" · "Contact me"   (sin "Download CV" hasta tener PDF)
│   │   └── .social-links × 4                          reutiliza estilos de .social-links
│   ├── section#about .about-me                        reutiliza
│   │   ├── foto + bio (2 párrafos)
│   │   ├── .stats × 4                                 nuevo · home.css
│   │   └── ficha (Location, Languages, Availability)  reutiliza .about-me .content ul
│   ├── section#experience .resume                     reutiliza .resume-item × 8
│   ├── section#portfolio .portfolio  (título "Projects")
│   │   ├── .project-filters (button × 4, hidden sin JS)   nuevo · reemplaza #portfolio-flters
│   │   └── .row > .project-card × 15                  nuevo · imagen + título + categoría + descripción + links con texto
│   ├── section#skills .skills                         nuevo · .skill-group × 5 (grilla 3/2/1 columnas)
│   ├── section#services .services                    reutiliza .icon-box × 6 + .services__cta nuevo
│   ├── section#education .resume                      reutiliza .resume-item (título + certificaciones) + idiomas
│   └── section#contact .contact                       reutiliza .info-box × 4 + botón "Email me" nuevo
└── footer.site-footer                                 nuevo · © año · "Back to top" → #hero
```

- **Reutiliza:** `.section-title`, `.about-me`, `.resume`/`.resume-item`, `.services .icon-box`, `.contact .info-box`, `.social-links`, grilla de Bootstrap, iconos `bi`/`bx`, GLightbox.
- **Tokens nuevos:** ninguno; se usan los existentes (`--color-overlay` para la barra, `--color-accent`, `--color-surface`, `--color-text-muted`, `--space-*`, `--font-ui`, `--radius-*`).
- **Skeleton / estados:** no aplica (contenido estático).
- **Sin JS:** el menú móvil se muestra desplegado (el colapso solo se activa cuando `initSiteNav` marca la barra como mejorada); la barra de filtros queda oculta (`hidden`) y se ven los 15 proyectos; las imágenes "Zoom" abren el archivo directamente.
- **Scroll:** `scroll-margin-top` en las secciones para que la barra fija no tape el título; `scroll-behavior: smooth` solo con `prefers-reduced-motion: no-preference`.

## Estado

`src/features/home/state.js`:

- `LEGACY_HASH_ALIASES = { '#resume': '#experience', '#header': '#hero' }`
- `resolveSectionHash(hash, knownIds) → string | null`: aplica alias y devuelve el ancla si existe la sección; si no, `null`.
- `pickActiveSection(sections: { id, top }[], offset) → id | null`: última sección cuyo `top` ≤ `offset` (posición de scroll + alto de la barra).
- `isProjectVisible(categories: string[], filter) → boolean`: `'all'` muestra todo.
- Estado del filtro: `{ filter: 'all' }` con `getFilter()`, `setFilter(filter)` y `subscribe(listener)`.

## Datos

| Fuente / endpoint                  | Service | Manejo de error |
| ---------------------------------- | ------- | --------------- |
| Contenido estático en `index.html` | —       | No aplica       |

## Tests

| Archivo de test                              | Qué cubre                                                                                                                                                     |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `tests/features/home/state.test.js`          | Alias (`#resume`, `#header`), ancla desconocida/vacía, sección activa (antes de la primera, en medio, al final), visibilidad por filtro, `setFilter` notifica |
| `tests/features/home/site-nav.test.js`       | Abrir/cerrar con el botón (`aria-expanded`), cierre con `Esc` y al elegir un link, foco vuelve al botón, clic fuera cierra, `aria-current` en la activa       |
| `tests/features/home/project-filter.test.js` | La barra se muestra al iniciar, `aria-pressed`, filtrar oculta/muestra tarjetas, "All" muestra las 15                                                         |
| `tests/features/home/footer-year.test.js`    | Escribe el año actual                                                                                                                                         |

## Tareas

- [x] **T1 · Scaffold del feature** — `src/features/home/{home.page.js,home.css,state.js,components/*.js}` (exports vacíos), `index.html` (enlazar `tokens.css` y `home.css`; cargar `home.page.js` como módulo; quitar scripts de `main.js` e Isotope y el CSS de Remixicon). Listo cuando: la página carga sin errores en consola y `npm run lint` pasa.
- [x] **T2 · Lógica pura y estado** — `src/features/home/state.js`, `tests/features/home/state.test.js`. Listo cuando: los tests de `state` pasan.
- [x] **T3 · Scroll continuo y barra fija** — `assets/css/style.css` (dec. 2), `index.html` (`header.site-header`, `section#hero`, `footer.site-footer`), `home.css`. Listo cuando: todas las secciones son visibles en orden haciendo scroll, la barra queda fija con "Arom Ramirez" en una línea (375px y 1280px) y los títulos no quedan tapados al saltar a un ancla.
- [x] **T4 · About y Skills** — `index.html`, `home.css` (cifras, grupos de skills). Listo cuando: About muestra bio, 4 cifras y ficha sin teléfono ni email; Skills muestra 5 grupos; Interests ya no existe; los textos coinciden con la spec.
- [x] **T5 · Experience y Education** — `index.html`. Listo cuando: Experience tiene los 8 puestos en orden y con el formato de la spec; Education tiene título, 5 certificaciones e idiomas; no hay `<ul>` dentro de `<p>` ni `<li>` sueltos.
- [x] **T6 · Projects** — `index.html` (15 tarjetas, barra de filtros con `hidden`), `assets/css/style.css` (quitar hover de portfolio), `home.css` (`.project-card`, `.project-filters`). Listo cuando: cada tarjeta muestra título, categoría, descripción y links con texto sin hover; las etiquetas son consistentes.
- [x] **T7 · Services, Contact y footer** — `index.html`, `home.css`. Listo cuando: 6 servicios + "Let's talk" → `#contact`; Contact con "Email me", ubicación, email, teléfono y 4 redes; footer con año y "Back to top".
- [x] **T8 · Navegación** — `components/site-nav.js`, `home.page.js`, `tests/features/home/site-nav.test.js`. Listo cuando: CA3–CA7 se cumplen en el preview y los tests pasan.
- [x] **T9 · Filtros, lightbox y año** — `components/project-filter.js`, `components/footer-year.js`, `home.page.js` (GLightbox), tests. Listo cuando: CA12 y CA15 se cumplen y los tests pasan.
- [x] **T10 · Limpieza y lint del HTML** — borrar `assets/js/main.js`, `portfolio-details.html` y vendors sin uso (dec. 5); `.prettierignore`, `package.json` (dec. 4); `docs/ai/architecture.md`. Listo cuando: `npm run check` pasa incluyendo `index.html` y no queda ninguna referencia a archivos borrados.
- [x] **T11 · Revisión final** — Listo cuando: `npm run check` en verde y revisado en el preview a 320, 375, 768 y 1280px, con teclado y con JavaScript deshabilitado.

## Desvíos

Surgieron durante `/implement` y fueron aprobados por el dev el 2026-11-12:

1. **`.htmlhintrc`: `empty-tag-not-self-closed` pasa a `false`.** Prettier siempre escribe `<meta />` / `<img />` y la regla lo prohíbe; al incluir `index.html` en lint (dec. 4) las dos herramientas chocaban. Gana Prettier (formato del proyecto).
2. **Títulos de ítems con clases propias.** Para mantener la jerarquía de encabezados (h2 de sección → h3 de ítem) se usan `.resume-item__title`, `.resume-item__date` y `.services__title` en `home.css`, que replican el aspecto de las reglas legadas `h4`/`h5`.
3. **Docs con referencias al legado borrado:** además de `architecture.md`, se actualizaron `AGENTS.md` (sección "Nunca") y `docs/ai/workflows/impact.md`, que nombraban `main.js` y `portfolio-details.html`.
4. **`assets/vendor/waypoints/` también quedó sin uso** (solo lo cargaba `portfolio-details.html`). No estaba en la dec. 5, así que **no se borró**: falta decidir.
5. **`docs/specs/README.md`** (fuera del plan, detectado en `/verify`): se reordenó la lista de specs sugeridas al escribir esta spec. Solo documentación.

## Verificación (2026-11-12)

Criterios ✅ 15 · ❌ 0 · 👀 3 (confirmados a mano por el dev). Checks: lint ✅ · format ✅ · test ✅ (34/34). Hallazgos para specs futuras: imágenes sin `width`/`height`; `bootstrap.bundle.min.js` sin uso; meta description menciona Wordbox (SEO).
