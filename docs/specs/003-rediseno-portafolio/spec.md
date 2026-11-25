# Spec: Rediseño del portafolio (posicionamiento Flutter + Unity + XR)

- **Estado:** approved <!-- draft | approved | implemented -->
- **Fecha:** 2026-11-25
- **Tipo:** rediseño
- **Ubicación:** `index.html` (Hero, About, Projects, Skills, Services, Contact, nav, `<head>`); páginas nuevas de casos de estudio; imágenes en `assets/img/`

## Objetivo

Que el sitio presente a Arom como un perfil senior que **une Flutter con Unity y XR** en una sola propuesta, que muestre pensamiento de producto, arquitectura y diseño, y que convierta visitas en contactos para trabajo **freelance o por contrato** (agendar llamada, email, CV).

## Contexto actual

- Página única con scroll continuo (spec `001-contenido-y-estructura`) y estilos con tokens (spec `002-tokens-y-estilos`). Solo tema oscuro; no hay selector de tema ni de idioma.
- Hero: nombre + "Flutter Developer & Unity Game Developer" (suena a dos perfiles); "6+ years" en hero, About y metas; botones "View projects" y "Contact me".
- Projects: 14 tarjetas con filtro All / Unity 3D / Unity 2D / Unity VR - AR. La mitad son ejercicios de curso. No hay ningún proyecto de Flutter.
- No hay casos de estudio. Las métricas de Wordbox y Shokworks solo aparecen como viñetas en Experience.
- Skills "Unity & XR" no menciona AR Foundation, ARCore ni ARKit. Vuforia solo aparece en la tarjeta de Architecture AR.
- Contact muestra el teléfono (`tel:`). No hay botón para agendar llamada ni para descargar el CV.
- El fondo `bg3.png` pesa 5.3 MB; las capturas de proyectos son PNG/JPG sin optimizar.
- **Fuente de verdad de datos:** los tres CV (Flutter, Unity, Flutter & Unity) que el dev entregó el 2026-11-25. Todo dato del sitio (fechas, años, métricas, stack) debe coincidir con ellos.

## Flujo

- **Entrada:** link directo a la página principal (LinkedIn, CV, GitHub, buscador), con o sin ancla; o link directo a una página de caso de estudio.
- **Condiciones:** sin login ni datos remotos. Con JS deshabilitado todo el contenido es visible (sin filtro ni galería ampliada).
- **Salida:** agendar llamada en Calendly, escribir por email, descargar un CV, abrir un perfil social, un repo, un video o un caso de estudio.
- **Reentrada:** recargar o compartir un link mantiene la página y el ancla; atrás/adelante recorre anclas y páginas visitadas.

| #   | Página/sección         | Acción                                   | Lleva a                                                     | Fuente de datos |
| --- | ---------------------- | ---------------------------------------- | ----------------------------------------------------------- | --------------- |
| 1   | Hero                   | "View case studies"                      | Sección Case Studies                                        | —               |
| 2   | Hero / Contact / casos | "Book a call"                            | `https://calendly.com/arommramirezz/30min` en pestaña nueva | HTML estático   |
| 3   | Nav                    | "Case Studies"                           | Sección Case Studies                                        | —               |
| 4   | Case Studies (home)    | Clic en una tarjeta de caso              | Página de ese caso                                          | HTML estático   |
| 5   | Página de caso         | "Back to portfolio" / marca del nav      | Página principal (sección Case Studies)                     | —               |
| 6   | Projects               | Filtro All / Flutter / XR                | Muestra solo los proyectos de esa categoría                 | HTML estático   |
| 7   | Projects               | "Code" / "Video" / "Zoom" de una tarjeta | Repo en GitHub / video en YouTube / imagen ampliada         | HTML estático   |
| 8   | Projects               | "Play in browser" (oculto hoy)           | Build WebGL en itch.io en pestaña nueva                     | HTML estático   |
| 9   | Contact                | "Download CV" (3 versiones, ocultas hoy) | Descarga el PDF elegido                                     | PDF en el repo  |
| 10  | Contact                | "Email me" / email / íconos sociales     | `mailto:` / perfiles en pestaña nueva                       | HTML estático   |

## Páginas y estados

Orden de la página principal: **Hero → About → Case Studies → Experience → Projects → Skills → Services → Education → Contact → Footer**. El nav agrega "Case Studies" entre About y Experience.

### Fase 1 — Hero y posicionamiento

- Debajo del nombre, el titular: **"Flutter & Unity Developer — I build mobile apps with embedded 3D, AR and VR experiences."**
- Años: **"7 years"** (sin "+") en hero, About, `meta description` y `og:description`, igual que los CV.
- Botones: "View case studies" (primario) y "Book a call" (secundario, Calendly). Se quitan "View projects" y "Contact me".
- **Responsive:** botones apilados en móvil, en fila desde 768px.

### Fase 2 — Limpieza de proyectos

- **Salen del sitio** (los repos siguen en GitHub): Roll a Ball, Pong, Space Invaders, Fruit Ninja, Collecting Coins & Minimap, Zig Zag 3D, FPS Zombies, 360 Image Visualizer, Art Gallery, Simple Walking, Space Shooter VR. No hay página "Learning archive".
- Imágenes: se borran del repo solo las que ya nada usa (las de los 11 proyectos retirados). Las que siguen en uso se quedan y el dev las reemplazará más adelante.
- **Quedan:** Multiplayer VR, Sword and Pistol VR, Alejandria Punk VR, Architecture AR, más la tarjeta "In progress" de la Fase 4. Total: 5 (máximo 6).
- Cada tarjeta: título, una línea de valor, etiquetas de stack y al menos un enlace. Excepción: la tarjeta "In progress" puede no tener enlaces hasta que exista algo publicable.
- Filtro: **All / Flutter / XR**. Una tarjeta puede estar en las dos categorías.
- **Vacío:** no puede ocurrir (cada filtro tiene al menos una tarjeta).
- **Responsive:** 1 columna en móvil, 2 en tablet, 3 en escritorio (como hoy).

### Fase 3 — Casos de estudio

- Sección "Case Studies" en la página principal con una tarjeta por caso (título, una línea, etiquetas, link "Read case study").
- Una página por caso, todas con la misma plantilla reutilizable de 6 bloques:
  1. Context & problem
  2. My role & team
  3. Technical & design decisions (por qué, no solo qué)
  4. Results (métricas)
  5. Stack
  6. Images / video (sin código propietario)
- Cada página tiene nav simple con vuelta al portafolio, un CTA "Book a call" al final y el footer del sitio.
- Lo que falte se marca con **TODO** en comentarios HTML; en la página visible se muestra un marcador de imagen neutro donde falten imágenes. Nunca se inventan métricas ni datos de clientes.
- Casos iniciales y datos confirmados (según CV):

| Caso                           | Datos confirmados                                                                                                                                                       | TODO (los completa el dev)                                              |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Wordbox English                | Mid-Senior Unity Developer, Jun 2023 – Dec 2025; carrusel infinito, animaciones de subida de nivel, protección de rachas; 1.5M+ descargas, 125K MAU, 120+ países, 4.9/5 | Equipo, decisiones técnicas, métricas propias de cada feature, imágenes |
| VR en Meta Quest 2 (Shokworks) | Unity XR Developer, Aug 2022 – Feb 2023; hasta 30% más de frame rate y 50% menos de carga reduciendo draw calls, reestructurando escenas y optimizando scripts          | Equipo, contexto del cliente publicable, imágenes                       |
| Fintech en Flutter (Meru)      | Flutter Developer, Jun 2026 – presente; flujos de pago, pantallas dirigidas por backend, migración a arquitectura por features, sistema de diseño, feature flags        | Métricas publicables, equipo, imágenes. Sin datos confidenciales        |

### Fase 4 — Proyecto de Flutter "In progress"

- Tarjeta destacada con etiqueta visible "In progress": app de catálogo de muebles con AR. Flutter para catálogo, login y carrito; Unity embebido con AR Foundation para colocar productos en el espacio real.
- Enlaces a Google Play, repositorio y video preparados pero **ocultos** con TODO hasta que existan.
- Imagen: marcador neutro hasta que haya captura.

### Fase 5 — Demos jugables

- Hoy no existe ningún build WebGL. Las tarjetas de Unity tienen el botón "Play in browser" **oculto** con TODO; se muestra cuando el dev agregue la URL de itch.io.

### Fase 6 — Skills y servicios

- **Unity & XR:** agregar AR Foundation (ARCore en Android, ARKit en iOS), OpenXR, Meta XR SDK y Meta Quest. Vuforia no va en Skills; solo queda como mención histórica en Architecture AR.
- **About** y servicio **XR Development** mencionan AR Foundation, ARCore y ARKit.
- **Tools & Practices:** agregar spec-driven development, AGENTS.md, ADRs (architecture decision records) y Figma. El dev los agrega también a los CV (decisión del 2026-11-25).
- Servicio nuevo **"Flutter + Unity Integration"**.

### Fase 7 — Contacto y privacidad

- Se quita el teléfono y todo `tel:` del sitio. Quedan Location, Email y Social (3 tarjetas; en escritorio no debe quedar un hueco visible).
- Botón "Book a call" (Calendly) junto a "Email me".
- "Download CV" con tres versiones (Flutter, Unity, Flutter & Unity) en PDF dentro de `assets/cv/`. Cada botón queda **oculto** hasta que su PDF exista (nunca un link roto).
- Revisión final de fechas, años, métricas y stack contra los CV.

### Fase 8 — Calidad técnica

- SEO: `title`, `meta description`, `og:*` y `canonical` en cada página (incluidas las de casos); texto alternativo en todas las imágenes.
- Imágenes que quedan en el sitio y `bg3.png` convertidas a WebP; lazy loading en todo lo que no está en el primer viewport.
- Lighthouse ≥ 90 en Performance, Accessibility y SEO (móvil) en la home y en una página de caso. Lo mide el dev en Chrome DevTools o PageSpeed Insights; si hace falta, se usa `npx lighthouse` con su aprobación.
- Sin enlaces rotos (internos y externos).

**Temas:** solo oscuro (no hay tema claro todavía). **Idioma:** todo en inglés; no hay traducciones.

## Endpoints

No aplica: contenido estático. Calendly e itch.io son enlaces externos, sin scripts embebidos.

## Textos

Los marcados con "propuesta" los redactó la IA a partir de los CV y la spec del dev; el dev los confirmó el 2026-11-25.

| Ubicación                         | EN                                                                                                                |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Hero, titular                     | Flutter & Unity Developer — I build mobile apps with embedded 3D, AR and VR experiences.                          |
| Hero, intro (propuesta)           | 7 years shipping mobile apps, games and XR experiences. Currently building fintech products with Flutter at Meru. |
| Hero, botones                     | View case studies · Book a call                                                                                   |
| Nav                               | Case Studies                                                                                                      |
| Sección                           | Case Studies                                                                                                      |
| Tarjeta de caso, link             | Read case study                                                                                                   |
| Página de caso, volver            | Back to portfolio                                                                                                 |
| Página de caso, bloques           | Context & problem · My role & team · Technical & design decisions · Results · Stack · Gallery                     |
| Filtro                            | All · Flutter · XR                                                                                                |
| Etiqueta Fase 4                   | In progress                                                                                                       |
| Botón Fase 5                      | Play in browser                                                                                                   |
| Servicio nuevo, título            | Flutter + Unity Integration                                                                                       |
| Servicio nuevo, texto (propuesta) | Mobile apps with embedded 3D, AR or VR modules: Flutter for the product, Unity for the immersive part.            |
| Contact, botones                  | Email me · Book a call                                                                                            |
| Contact, CV                       | Download CV: Flutter · Unity · Flutter & Unity                                                                    |

Textos aprobados con el plan (decisión 7, 2026-11-25):

| Ubicación                  | EN                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| About, párrafo 1           | I'm a mobile developer with 7 years of experience across Flutter and Unity. I build production Flutter apps, currently payment features for a fintech platform, and I spent most of my career in Unity shipping games, VR and AR experiences with AR Foundation (ARCore on Android, ARKit on iOS), and features for a consumer app with more than 1.5 million downloads. Working in both lets me build apps that combine standard mobile flows with interactive 3D, AR or VR content. |
| Servicio XR Development    | Immersive experiences for Meta Quest and mobile AR with AR Foundation (ARCore on Android, ARKit on iOS).                                                                                                                                                                                                                                                                                                                                                                              |
| Skills, Unity & XR         | Unity · C# · 2D & 3D gameplay systems · AR Foundation (ARCore, ARKit) · OpenXR · Meta XR SDK · Meta Quest · Multiplayer (Photon) · Performance profiling & optimization                                                                                                                                                                                                                                                                                                               |
| Skills, Tools (se agregan) | Spec-driven development · AGENTS.md · ADRs (architecture decision records) · Figma                                                                                                                                                                                                                                                                                                                                                                                                    |
| Caso Wordbox, título/línea | Wordbox English — Engagement features for an English-learning app with 1.5M+ downloads.                                                                                                                                                                                                                                                                                                                                                                                               |
| Caso VR, título/línea      | VR Training Simulation on Meta Quest 2 — Rebuilding a VR training simulation for Meta Quest 2: up to 30% higher frame rate, 50% faster loads.                                                                                                                                                                                                                                                                                                                                         |
| Caso fintech, título/línea | Fintech App in Flutter — Payment flows, backend-driven screens and a feature-based architecture for a fintech app.                                                                                                                                                                                                                                                                                                                                                                    |
| Tarjeta "In progress"      | Furniture AR app — Flutter handles the catalog, login and cart; an embedded Unity module with AR Foundation places products in your real space.                                                                                                                                                                                                                                                                                                                                       |

Líneas de valor y etiquetas de las tarjetas (propuesta, basada en las descripciones actuales y el CV de Unity):

| Proyecto            | Línea de valor                                                         | Etiquetas                        |
| ------------------- | ---------------------------------------------------------------------- | -------------------------------- |
| Furniture AR app    | See how furniture fits in your room before you buy it.                 | Flutter · Unity · AR Foundation  |
| Multiplayer VR      | A shared 3D space where several people meet and talk in real time.     | Unity · C# · Photon · Voice chat |
| Sword and Pistol VR | A rhythm-style VR shooter and slicer with scoring.                     | Unity · C# · Meta Quest 2 / 3    |
| Alejandria Punk VR  | An underwater roller coaster ride built for VR.                        | Unity · C# · Meta Quest 2 / 3    |
| Architecture AR     | Shows 3D architectural details over real plans with augmented reality. | Unity · C# · Vuforia             |

## Criterios de aceptación

- [ ] CA1 — El titular del hero menciona Flutter, Unity y XR (3D, AR, VR) como una sola propuesta.
- [ ] CA2 — "7 years" aparece igual en hero, About, `meta description` y `og:description`; no queda "6+" en ningún archivo del sitio.
- [ ] CA3 — El hero tiene "View case studies" (lleva a `#case-studies`) y "Book a call" (abre Calendly en pestaña nueva).
- [ ] CA4 — Projects muestra como máximo 6 tarjetas y ninguna de las once retiradas.
- [ ] CA5 — Cada tarjeta tiene título, línea de valor, etiquetas y al menos un enlace visible (salvo la "In progress").
- [ ] CA6 — El filtro All / Flutter / XR funciona con teclado y ningún filtro queda vacío.
- [ ] CA7 — Existe la sección Case Studies con 3 tarjetas, cada una lleva a su página.
- [ ] CA8 — Las 3 páginas de caso usan la misma plantilla de 6 bloques y tienen TODO donde falta información.
- [ ] CA9 — Ninguna métrica del sitio falta en los CV.
- [ ] CA10 — Hay al menos un proyecto de Flutter visible (tarjeta "In progress").
- [ ] CA11 — Los botones "Play in browser" y "Download CV" sin URL o sin PDF no son visibles ni enfocables.
- [ ] CA12 — Skills, About y el servicio XR mencionan AR Foundation, ARCore y ARKit; Vuforia solo aparece en Architecture AR.
- [ ] CA13 — Existe el servicio "Flutter + Unity Integration".
- [ ] CA14 — No hay número de teléfono ni `tel:` en ningún archivo publicado.
- [ ] CA15 — Todas las imágenes tienen `alt`; las que no están en el primer viewport usan `loading="lazy"`.
- [ ] CA16 — Lighthouse móvil ≥ 90 en Performance, Accessibility y SEO en la home y en una página de caso.
- [ ] CA17 — No hay enlaces rotos.
- [ ] CA18 — Todo se ve bien en 320 / 768 / 992 / escritorio y se navega con teclado.
- [ ] CA19 — Un commit por fase, aprobado por el dev antes de pasar a la siguiente.

## Fuera de alcance

- Tema claro, selector de idioma y traducciones.
- Widget de Calendly embebido o cualquier script de terceros nuevo.
- Página "Learning archive".
- Crear los builds WebGL, los PDF de los CV o las capturas de los casos (los aporta el dev).
- Cambiar la sección Experience o Education más allá de corregir diferencias con los CV.

## Preguntas abiertas

Ninguna. Resueltas el 2026-11-25:

1. Imágenes: se borran solo las que no se usan; las usadas se reemplazarán después.
2. OpenXR, Meta XR SDK, ADRs y Figma se agregan al sitio ahora (el dev actualiza los CV).
3. Textos "propuesta": confirmados.
4. Sword and Pistol VR y Alejandria Punk VR: Meta Quest 2 y Meta Quest 3.
5. Orden Hero → About → Case Studies → Experience: confirmado.
