# Plantilla: página de caso de estudio

Cada caso de estudio es una página estática `pages/case-study-<slug>.html` del feature `case-study` (spec `003-rediseno-portafolio`). Todas comparten la misma estructura de 6 bloques y los mismos estilos (`src/styles/base.css` + `src/features/case-study/case-study.css`).

## Crear un caso nuevo

1. Copia una página existente (por ejemplo `pages/case-study-wordbox.html`) como `pages/case-study-<slug>.html`, con `<slug>` en kebab-case.
2. Actualiza el `<head>`: `title`, `description`, `canonical`, `og:url`, `og:title` y `og:description`. La URL es `https://aramirezz0110.github.io/portfolio/pages/case-study-<slug>.html`.
3. Completa el encabezado (`h1`, resumen de una línea, etiquetas de stack) y los 6 bloques.
4. Agrega una tarjeta en la sección `#case-studies` de `index.html` con el mismo título, resumen y etiquetas.
5. Corre `npm run check` y revisa la página en 320 / 768 / 992 px y en escritorio.

## Reglas de contenido

- **Nunca inventar** métricas, nombres de clientes ni datos del equipo. Lo que falte va en un comentario `<!-- TODO: … -->` dentro del bloque.
- Las métricas deben coincidir con los CV. Si una métrica es del producto (descargas, usuarios) y no del trabajo propio, va en "Context & problem", no en "Results".
- **Sin código propietario** ni capturas con datos confidenciales. Si el cliente no permite nombrarlo, el título describe el producto ("Fintech App in Flutter") y el nombre solo aparece donde ya es público (Experience).
- Imágenes: `<img>` con `alt`, `width`, `height` y `loading="lazy"`, en JPEG optimizado (`sips`, ≤ 1200 px de ancho; ver Desvíos del plan 003). Mientras no haya, usa `.media-placeholder` (decorativo, `aria-hidden="true"`).

## Los 6 bloques

| #   | Título visible               | Qué contiene                                              |
| --- | ---------------------------- | --------------------------------------------------------- |
| 1   | Context & problem            | Producto, usuarios y el problema concreto                 |
| 2   | My role & team               | Puesto, fechas, con quién trabajaste                      |
| 3   | Technical & design decisions | Qué se hizo y **por qué** (alternativas, compromisos)     |
| 4   | Results                      | Métricas del trabajo propio; si no hay, resultados claros |
| 5   | Stack                        | Tecnologías usadas                                        |
| 6   | Gallery                      | Imágenes o video sin código propietario                   |

## Esqueleto de `<main>`

```html
<main class="case-study">
  <div class="container section-panel">
    <article class="case-study__body">
      <header>
        <h1 class="case-study__title">Title</h1>
        <p class="case-study__summary">One-line summary.</p>
        <ul class="tag-list" aria-label="Stack">
          <li class="tag">Tech</li>
        </ul>
      </header>

      <section class="case-study__block" aria-labelledby="context">
        <h2 class="section-heading__title" id="context">Context &amp; problem</h2>
        <!-- TODO: … -->
      </section>

      <!-- role, decisions, results, stack: mismo patrón con ids role, decisions, results, stack -->

      <section class="case-study__block" aria-labelledby="gallery">
        <h2 class="section-heading__title" id="gallery">Gallery</h2>
        <div class="case-study__gallery">
          <div class="media-placeholder" aria-hidden="true"></div>
          <div class="media-placeholder" aria-hidden="true"></div>
        </div>
      </section>

      <div class="case-study__cta">
        <a
          class="button"
          href="https://calendly.com/arommramirezz/30min"
          target="_blank"
          rel="noopener noreferrer"
          >Book a call</a
        >
      </div>
    </article>
  </div>
</main>
```

La barra (marca + "Back to portfolio"), el footer y el módulo `case-study.page.js` son iguales en todas las páginas: cópialos de un caso existente.
