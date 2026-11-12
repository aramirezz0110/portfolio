# Plan: Tokens y estilos

- **Estado:** done <!-- draft | approved | in progress | done -->
- **Fecha:** 2026-11-12
- **Spec:** [spec.md](spec.md)

## Resumen

Las reglas vivas de `assets/css/style.css` se mueven: las globales (enlaces sin subrayado, fuente de encabezados) a `src/styles/base.css` y el resto a `src/features/home/home.css`, con bloques BEM propios y solo tokens. `index.html` cambia las clases legadas por las nuevas, enlaza `themes.css` y `base.css` en el orden de las convenciones y deja de cargar `style.css`, que se borra.

En tokens: `--color-on-accent` pasa a oscuro (decisión #13 de la spec) y se agrega `--font-weight-medium`. Un lint nuevo de Stylelint (regla incluida en `stylelint-config-standard`, sin dependencias) impide familias tipográficas literales fuera de `tokens.css`. Además: Google Fonts con la API css2, `width`/`height` en las 16 imágenes, y se quitan el JS de Bootstrap y Waypoints.

Antes de tocar nada se toman capturas de referencia para comparar después (CA4).

## Decisiones a confirmar

1. **Nombres BEM nuevos** (reemplazan clases legadas en `index.html`):

   | Legado                                   | Nuevo                                                                                  |
   | ---------------------------------------- | -------------------------------------------------------------------------------------- |
   | `.section-title` + `h2`                  | `.section-heading` + `.section-heading__title`                                         |
   | `.about-me` / `.content` / `ul` `li` `i` | `.about` / `.about__content` / `.about__facts` `.about__fact` `.about__fact-icon`      |
   | `.resume-item` (ya es bloque BEM)        | se mantiene; sus reglas pasan a `home.css`                                             |
   | `.icon-box` (+ `p`)                      | `.service-card` (+ `.service-card__text`); `.services__title` → `.service-card__title` |
   | `.info-box` / `i.bx` / `h3` / `p`        | `.contact-card` / `__icon` / `__title` / `__text`                                      |
   | `.info-box .social-links`                | `.social-links--compact`                                                               |

2. **Panel negro de cada sección.** Hoy el legado sobrescribe `.container` de Bootstrap (`section .container`), lo que contradice `ui-conventions.md`. Propuesta: clase nueva `.section-panel` en el `container` de cada sección (salvo el hero, que hoy lo anula).
3. **Reglas globales en `base.css`:** `a { text-decoration: none }` y `h1–h6` con `--font-heading`. Son globales y no del feature.
4. **Tokens:** `--color-on-accent: var(--palette-black)` en `tokens.css` (el tema claro lo hereda: negro sobre `--palette-green-600` también cumple). Nuevo `--font-weight-medium: 500` (títulos de sección y encabezados de Bootstrap). Ningún primitivo nuevo.
5. **Unificación de colores (decisión #3 de la spec), detalle:** `#4ceb95` → `--color-accent`; `#aaa` del título de sección → `--color-text-muted`; fondo gris 10 % de Services y blanco 8 % de Contact → `--color-surface`; blanco 50 % del título de Contact → `--color-text-muted`; borde de Resume blanco 20 % → `--color-border`.
6. **Borrar también `assets/vendor/bootstrap/js/`** (la spec solo pide dejar de cargarlo; nada más lo usa). Alternativa: dejar la carpeta.
7. **Regla de Stylelint nueva:** `declaration-property-value-allowed-list` con `font-family` solo `var(--font-…)` o `inherit`, desactivada en `tokens.css`. Hace verificable el CA2.

## Archivos

| Acción    | Ruta                                                      | Motivo                                                                                        |
| --------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| modificar | `src/styles/tokens.css`                                   | `--color-on-accent` oscuro, `--font-weight-medium` (dec. 4)                                   |
| modificar | `src/styles/base.css`                                     | Enlaces sin subrayado y fuente de encabezados (dec. 3)                                        |
| modificar | `src/features/home/home.css`                              | Fondo con imagen, panel, encabezado de sección, About, Resume, Services, Contact              |
| modificar | `index.html`                                              | Hojas enlazadas y orden, Google Fonts css2, clases BEM, `width`/`height`, sin JS de Bootstrap |
| modificar | `.stylelintrc.json`                                       | Regla de familias tipográficas (dec. 7)                                                       |
| modificar | `.prettierignore`                                         | El comentario ya no habla de legado: `assets/` queda ignorado solo por vendor e imágenes      |
| modificar | `docs/ai/architecture.md`, `AGENTS.md`                    | Quitar `assets/css/` y `style.css` como legado; `assets/css/` sale de la lista cerrada        |
| borrar    | `assets/css/style.css`                                    | Migrado (spec CA1)                                                                            |
| borrar    | `assets/vendor/waypoints/`, `assets/vendor/bootstrap/js/` | Sin uso (spec #12, dec. 6)                                                                    |

## UI

### `index.html`

```
<head>  vendor (bootstrap.css, bootstrap-icons, boxicons, glightbox) → tokens.css → themes.css → base.css → home.css
body                       fondo fijo bg3.png sobre --color-bg (home.css, desde el legado)
└── main > section
    └── .container.section-panel        panel --color-overlay (dec. 2)
        ├── .section-heading > h2.section-heading__title   (+ línea ::after en --color-accent)
        ├── About:    .about > .about__content > ul.about__facts > li.about__fact > i.about__fact-icon
        ├── Resume:   .resume-item (sin cambios de HTML)
        ├── Services: .service-card > h3.service-card__title + p.service-card__text   (hover: --color-accent / --color-on-accent)
        └── Contact:  .contact-card > i.contact-card__icon + h3.contact-card__title + p.contact-card__text | .social-links.social-links--compact
```

- **Reutiliza:** tokens existentes; bloques `.social-links`, `.resume-item__*`, `.button`, `.project-filters__button` de `home.css` (heredan el nuevo `--color-on-accent`).
- **Tokens nuevos:** `--font-weight-medium: 500` (igual en ambos temas). Cambia: `--color-on-accent` → `--palette-black` (oscuro y claro).
- **Tamaños y espacios:** a `--space-*` / `--font-size-*` solo donde el valor coincide (4px, 8px, 14px, 16px…). El resto (20px, 26px, 30px, 36px, 80px…) queda literal (spec #10).
- **Imágenes** (`width` × `height` reales; el CSS ya escala con `height: auto`):

  | Imagen                 | Tamaño    | Imagen                  | Tamaño   |
  | ---------------------- | --------- | ----------------------- | -------- |
  | `me2.jpg`              | 1222×1222 | `MultiplayerVR.png`     | 1450×862 |
  | `360-image-app.jpg`    | 1280×576  | `Pong2D.png`            | 964×544  |
  | `architecture-app.jpg` | 1280×576  | `RollABallScene.png`    | 931×498  |
  | `art-gallery.jpg`      | 1280×576  | `SpaceInvadersDemo.png` | 614×347  |
  | `simple-walking.jpg`   | 1280×576  | `SpaceShooterVR.png`    | 1491×853 |
  | `AlejandriaPunk.png`   | 1637×929  | `SwordAndPistolVR.png`  | 964×577  |
  | `CollectCoins.png`     | 970×542   | `ZigZagProcedural.png`  | 588×328  |
  | `FPSZombies.png`       | 712×402   | `FruitNinja.png`        | 941×528  |

- **Google Fonts:** las variantes se miden en el navegador antes del cambio (recorrido de `getComputedStyle` por familia, peso y estilo). Estimado: Open Sans 400, 400i, 600, 700; Raleway 500, 600, 700; Poppins 400, 500, 600, 700.
- **Riesgo conocido:** `base.css` pone `background-color` en `body` y Bootstrap también. El fondo con imagen del legado depende de `body { background: transparent }`; `home.css` (carga última) lo conserva. Se verifica en T9.

## Estado

No aplica.

## Datos

Contenido estático en HTML.

## Tests

No aplica: solo cambian CSS y HTML, ningún módulo JS. Los tests existentes deben seguir en verde (menú, filtros, año). La verificación visual va en T9.

## Tareas

- [x] **T1 · Capturas y medición de referencia** — sin cambios de archivos (capturas en la carpeta temporal de la sesión). Listo cuando: hay capturas en oscuro a 320, 768, 992 y 1280 px de cada sección y la lista real de variantes de fuente usadas.
- [x] **T2 · Tokens y base** — `src/styles/tokens.css`, `src/styles/base.css`. Listo cuando: existen `--font-weight-medium` y `--color-on-accent` oscuro; `base.css` tiene las dos reglas globales; `npm run lint` pasa.
- [x] **T3 · Enlazar hojas y Google Fonts** — `index.html`. Listo cuando: el orden es vendor → tokens → themes → base → home (CA6) y la URL de fuentes es css2 con solo las variantes de T1 y `display=swap` (CA10).
- [x] **T4 · Migrar general, encabezado de sección y About** — `home.css`, `index.html`. Listo cuando: fondo con imagen, `.section-panel`, `.section-heading` y `.about` reproducen el aspecto de T1 usando solo tokens.
- [x] **T5 · Migrar Resume y Services** — `home.css`, `index.html`. Listo cuando: `.resume-item` y `.service-card` (incluido el hover con texto oscuro) se ven como T1 salvo las decisiones #3 y #13.
- [x] **T6 · Migrar Contact** — `home.css`, `index.html`. Listo cuando: `.contact-card` y `.social-links--compact` se ven como T1.
- [x] **T7 · Borrar legado y ajustar lint/docs** — `assets/css/style.css`, `.stylelintrc.json`, `.prettierignore`, `docs/ai/architecture.md`, `AGENTS.md`. Listo cuando: `style.css` no existe ni se enlaza; la regla de familias rechaza un literal de prueba; ningún doc lo menciona como legado vigente; `npm run check` pasa (CA1–CA3).
- [x] **T8 · Imágenes y vendor sin uso** — `index.html`, `assets/vendor/waypoints/`, `assets/vendor/bootstrap/js/`. Listo cuando: las 16 `<img>` tienen `width`/`height` de la tabla (CA8); no se carga el JS de Bootstrap y las carpetas no existen (CA9).
- [x] **T9 · Verificación visual** — sin cambios de archivos. Listo cuando: capturas después vs T1 sin diferencias salvo #3, #6 y #13 (CA4); con `data-theme="light"` forzado no queda ningún color fijo del oscuro (CA5); Tab muestra foco en todo (CA7); contraste sobre el acento ≥ 4.5:1 (CA12); sin JS se ve igual (CA11); menú móvil, filtros y galería funcionan (CA9); sin scroll horizontal a 320 px.

## Desvíos

<!-- Cambios respecto al plan aprobado: qué, por qué, aprobado el AAAA-MM-DD. -->

Aprobados por el dev el 2026-11-12:

1. **`--line-height-body` de 1.6 a 1.5** (`tokens.css`). Al enlazar `base.css`, todo el texto pasaba de 24px a 25.6px de interlineado y la página crecía ~150px, contra el CA4. 1.5 es el valor que daba Bootstrap.
2. **El hero también lleva `.section-panel`, con modificador `.section-panel--transparent`.** El legado le daba al contenedor del hero el padding de 30px; sin la clase, el hero se desplazaba. Reemplaza la regla `.hero .container`.
3. **`height: auto` en `.project-card__image`.** Con el atributo `height`, la imagen tomaba la altura en píxeles e ignoraba `aspect-ratio`.
4. **Texto sobre acento en más lugares:** `.button--secondary` necesitaba `color: var(--color-text)` explícito (heredaba el nuevo `--color-on-accent` oscuro sobre fondo oscuro), y el filtro activo y los íconos sociales del hero en hover pasaron a `--color-on-accent` (eran blanco sobre verde, cubiertos por la decisión #13 de la spec).
5. **Selectores `.contact-card .social-links--compact a` y bloque ubicado junto a `.hero .social-links a`**, para cumplir `no-descending-specificity` de Stylelint.
6. **`docs/ai/workflows/impact.md`** también mencionaba `style.css`; se reemplazó por una nota sobre `base.css` y tokens.

## Verificación (2026-11-12)

Criterios ✅ 10 · ❌ 0 · 👀 2 (CA4 a 320/992 px y CA11 sin JS, confirmados a mano por el dev junto con el hover de Services, la galería y un celular real). Checks: lint ✅ · format ✅ · test ✅ (34/34). Evidencia de CA4: comparación de estilos calculados antes/después a 375, 768, 1024 y 1280 px. Hallazgo para la 003: con el tema claro provisional, la marca de la barra queda negra sobre el overlay negro.
