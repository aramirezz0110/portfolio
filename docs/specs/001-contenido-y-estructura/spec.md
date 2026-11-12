# Spec: Contenido y estructura del portfolio

- **Estado:** implemented <!-- draft | approved | implemented -->
- **Fecha:** 2026-11-12
- **Tipo:** rediseño (contenido y estructura; lo visual va en specs posteriores)
- **Ubicación:** `index.html` completo (todas las secciones); se elimina la página `portfolio-details.html`

## Objetivo

Que un reclutador entienda en segundos quién es Arom, qué hace hoy y qué experiencia tiene, para conseguir **empleo remoto** (objetivo principal) y, en segundo lugar, **clientes freelance**. El contenido debe servir además como fuente del CV, por lo que los textos de experiencia siguen reglas compatibles con ATS.

## Contexto actual

- La página muestra el hero a pantalla completa; al elegir una opción del menú, cada sección **reemplaza** la pantalla (no hay scroll continuo).
- Secciones actuales: Home, About (bio + Core Skills + Interests), Resume (Summary, Education, Certificates, Experience), Services, Portfolio, Contact. Sin footer.
- Problemas que esta spec corrige: bio duplicada (About y Resume → Summary); experiencia fuera de orden cronológico y con viñetas genéricas repetidas; falta el puesto actual (Meru); Interests con 12 ítems que repiten Skills/Services; Services con 12 tarjetas que repiten Skills; teléfono en 3 lugares; tarjetas de proyectos sin texto visible hasta pasar el mouse; etiquetas inconsistentes; sin CTA ni footer; `portfolio-details.html` es una página de plantilla sin contenido que nada enlaza.

## Flujo

- **Entrada:** el usuario llega a la página principal por un link directo (LinkedIn, CV, GitHub, buscador), con o sin ancla de sección (`/#experience`).
- **Condiciones:** no hay login ni datos remotos. Con JavaScript deshabilitado todo el contenido es visible (sin filtros ni galería ampliada).
- **Salida:** el usuario descarga el CV, escribe por email, abre un perfil social o un proyecto (GitHub / YouTube) en otra pestaña.
- **Reentrada:** recargar mantiene la sección del ancla; los botones atrás/adelante del navegador recorren las anclas visitadas; un link con ancla abre directamente en esa sección.

| #   | Página/sección                | Acción                                             | Lleva a                                                  | Fuente de datos     |
| --- | ----------------------------- | -------------------------------------------------- | -------------------------------------------------------- | ------------------- |
| 1   | Barra de navegación (siempre) | Clic en "Arom Ramirez"                             | Inicio de la página (hero)                               | HTML estático       |
| 2   | Barra de navegación           | Clic en un ítem del menú                           | Scroll a esa sección; la URL cambia al ancla             | HTML estático       |
| 3   | Barra (móvil)                 | Abrir menú / elegir ítem / `Esc`                   | Abre el menú / va a la sección y cierra / cierra el menú | —                   |
| 4   | Hero                          | "View projects"                                    | Sección Projects                                         | —                   |
| 5   | Hero                          | "Download CV"                                      | Descarga el CV en PDF (oculto mientras no exista el PDF) | Archivo PDF en repo |
| 6   | Hero                          | "Contact me"                                       | Sección Contact                                          | —                   |
| 7   | Hero / Contact                | Íconos sociales                                    | LinkedIn, GitHub, X, YouTube en pestaña nueva            | HTML estático       |
| 8   | Projects                      | Filtro (All / Unity 3D / Unity 2D / Unity VR - AR) | Muestra solo los proyectos de esa categoría              | HTML estático       |
| 9   | Projects                      | "Zoom" / "Code" / "Video" de una tarjeta           | Imagen ampliada / repo en GitHub / video en YouTube      | HTML estático       |
| 10  | Services                      | "Let's talk"                                       | Sección Contact                                          | —                   |
| 11  | Contact                       | "Email me" / email / teléfono                      | Cliente de correo (`mailto:`) / llamada (`tel:`)         | HTML estático       |
| 12  | Footer                        | "Back to top"                                      | Inicio de la página                                      | —                   |

## Páginas y estados

Una sola página con **scroll continuo**, en este orden:

**Hero → About → Experience → Projects → Skills → Services → Education → Contact → Footer**

Se eliminan: sección **Interests**, bloque **Summary** de Resume, columna vacía de Skills, restos comentados (Age, Freelance, barras de progreso), y la página **`portfolio-details.html`**.

### Navegación

- Barra fija visible en toda la página con la marca **"Arom Ramirez"** y los ítems: About · Experience · Projects · Skills · Services · Education · Contact.
- El ítem de la sección visible se marca como activo mientras se hace scroll.
- Scroll suave al elegir un ítem (sin animación si el usuario tiene "reducir movimiento").
- Anclas: `#about`, `#experience`, `#portfolio` (Projects), `#skills`, `#services`, `#education`, `#contact`. Anclas antiguas: `#resume` lleva a Experience; `#header` lleva al inicio.
- **Responsive:** en móvil (< 992px) el menú se abre con un botón hamburguesa; se cierra al elegir un ítem, con `Esc` o tocando fuera; el foco vuelve al botón.

### Hero

- **Datos:** nombre completo, titular, una línea de presentación, 3 botones, 4 íconos sociales.
- **Estados:** "Download CV" no se muestra mientras el PDF no exista en el repo (decisión del dev: nunca un link roto).
- **Responsive:** a pantalla completa en todos los tamaños; botones apilados en móvil.

### About

- **Datos:** foto actual (`me2.jpg`, se mantiene), bio corta, 4 cifras destacadas, ficha (ubicación, idiomas, disponibilidad).
- **Notas:** el teléfono y el email **no** aparecen aquí (solo en Contact). El título universitario pasa a Education.

### Experience

- **Datos:** 8 puestos en orden cronológico inverso por fecha de inicio. Cada puesto: título, empresa, ubicación, fechas, viñetas. Meru además lleva una línea de descripción de la empresa.
- **Reglas ATS** (el contenido se reutiliza en el CV):
  - Encabezado de sección estándar: "Experience".
  - Formato fijo por puesto: `Job Title` — `Company` · `Location` · `Mon YYYY – Mon YYYY | Present` (meses en inglés abreviados a 3 letras).
  - Viñetas que empiezan con verbo de acción en pasado (o presente en el puesto actual), sin primera persona, sin repetir la misma viñeta entre puestos, con las palabras clave técnicas escritas igual en toda la página (Flutter, Dart, Bloc, Unity, C#, REST APIs, Firebase…).
  - Solo hechos confirmados por el dev; las cifras son las que ya están publicadas.
  - Sin tipo de contrato (decisión del dev).

### Projects

- **Datos:** los **15 proyectos actuales se mantienen** (no hay proyectos Flutter publicables todavía; no hay acceso a material de proyectos profesionales).
- Cada tarjeta muestra **siempre** (sin depender de hover): título, categoría, descripción de una línea y sus links con texto accesible ("Zoom", "Code", "Video").
- Filtros actuales: All · Unity 3D · Unity 2D · Unity VR - AR. Con JS deshabilitado se ven todos.
- **Responsive:** 3 columnas en escritorio, 2 en tablet, 1 en móvil.

### Skills

- **Datos:** 5 grupos (abajo, en Textos). Sin barras ni porcentajes.

### Services

- **Datos:** 6 servicios + una llamada a la acción final. Va después de Skills porque el freelance es objetivo secundario.

### Education

- **Datos:** título universitario, 5 certificaciones seleccionadas (sin año: no se conocen), idiomas.

### Contact

- **Datos:** frase de apertura, botón "Email me", ubicación, email, teléfono (único lugar donde aparece), los 4 perfiles sociales. Sin formulario (requeriría un servicio externo; otra spec).

### Footer

- **Datos:** "© {año actual} Arom Mauricio Ramirez Zambrana" y link "Back to top".

### Todas las secciones

- **Loading / error / vacío:** no aplican (contenido estático en el HTML).
- **Temas:** se mantiene el aspecto actual (oscuro); el modo claro es otra spec.
- **Idioma:** todo en inglés; la traducción es otra spec.

## Endpoints

No aplica: contenido estático.

## Textos

Propuestos por la IA a partir del contenido actual y las respuestas del dev. **Revisar uno por uno antes de aprobar.**

### Navegación y hero

| Ubicación           | EN                                                                                                                                |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Marca               | Arom Ramirez                                                                                                                      |
| Menú                | About · Experience · Projects · Skills · Services · Education · Contact                                                           |
| Hero — nombre       | Arom Mauricio Ramirez Zambrana                                                                                                    |
| Hero — titular      | Flutter Developer & Unity Game Developer                                                                                          |
| Hero — presentación | 6+ years building cross-platform mobile apps, games and XR experiences. Currently building fintech products with Flutter at Meru. |
| Hero — botones      | View projects · Download CV · Contact me                                                                                          |

### About

**Bio:**

> I'm a Flutter Developer with 6+ years of experience building cross-platform mobile apps, games and interactive products. I started with Unity and C#, shipping mobile games, VR training simulations and multiplayer experiences, and today I focus on Flutter, building fintech features such as payments, backend-driven screens and scalable feature-based architectures.
>
> I care about clean architecture, performance and maintainable code, and I enjoy working closely with product and design teams in remote environments.

**Cifras destacadas** (solo las cifras, sin nombrar a la empresa; decisión del dev):

| Cifra | Etiqueta            |
| ----- | ------------------- |
| 6+    | Years of experience |
| 1.5M+ | Downloads           |
| 120+  | Countries reached   |
| 4.9★  | App store rating    |

**Ficha:**

| Etiqueta     | Valor                          |
| ------------ | ------------------------------ |
| Location     | La Paz, Bolivia (GMT-4)        |
| Languages    | Spanish (Native), English (C1) |
| Availability | Open to remote roles           |

### Experience

**Flutter Developer** — Meru · Remote, United States · Jun 2026 – Present
_Global financial transactions platform._

- Build end-to-end payment and money movement features, including stablecoin wallet flows and third-party provider integrations.
- Develop dynamic, backend-driven forms and screens.
- Help migrate legacy code to a feature-based architecture and adopt a centralized design system.
- Roll out features safely using feature flags and remote configuration.
- Improve app maintainability through refactoring and technical debt cleanup.
- Use AI-assisted development tools (Claude Code, Cursor) in daily engineering workflows.

**Flutter Developer** — Independent · Remote · Jan 2025 – Present

- Built cross-platform Flutter applications using Bloc and Provider for state management, REST API integration and Firebase services.
- Implemented authentication flows, form validation, local storage and navigation in API-driven apps.
- Applied clean architecture and modular project structures with reusable, responsive UI components.
- Practiced unit and widget testing and Git workflows with branches and pull requests.

**Mid-Senior Unity Developer** — Wordbox English · Remote, Mexico · Jun 2023 – Dec 2025

- Developed and maintained features for a consumer English-learning app with 1.5M+ downloads, 125K MAU, users in 120+ countries, $1M+ annualized revenue and a 4.9/5 rating.
- Owned key features including an infinite content carousel, level-up animations and a streak-protection system.
- Refactored existing systems to improve scalability, maintainability and performance in a growing production codebase.
- Integrated REST APIs with backend services to support dynamic content generation.
- Solved mobile constraints including memory limits, app size optimization, and App Store and Google Play rejections.
- Collaborated daily with product managers and designers and weekly with backend developers; participated in code reviews.

**Unity Developer** — IbisDev · Remote, France · Jun 2023 – Oct 2023

- Redesigned the animation integration pipeline of a production Unity project focused on interactive 3D animations, improving asset management and runtime behavior.
- Integrated new 3D assets and updated UI elements to match revised design requirements.
- Fixed legacy issues and stabilized features implemented by previous developers.

**Unity XR Developer** — Shokworks Inc. · Remote, United States · Aug 2022 – Feb 2023

- Rebuilt and optimized a VR training simulation for educational use on Meta Quest 2.
- Improved frame rate by up to 30% and load times by 50% by reducing draw calls, restructuring scenes and optimizing runtime scripts.
- Delivered production-ready XR builds with consistent device compatibility through targeted profiling.

**Flutter Developer** — Wireframe Reality S.A.S. · Remote, Ecuador · Jul 2022 – Oct 2022

- Developed and maintained cross-platform Flutter apps for Android and iOS using Bloc and Provider.
- Implemented reusable UI components, authentication flows, form validation and local persistence.
- Integrated REST APIs and asynchronous data flows for dynamic application features.
- Contributed to feature development, bug fixing, refactoring and code reviews in a fully remote team.

**Unity Game Developer** — Xiara Studios · Remote, Bolivia · Jan 2021 – Jun 2022

- Developed a commercial multiplayer game with integrated voice chat.
- Built smartphone-based VR demos, including architectural walkthrough experiences for trade shows.
- Created prototypes for 2D platformer games.

**Freelance Mobile Developer (Unity)** — Freelance · Remote · Jan 2020 – Present

- Develop mobile apps and games for Android and iOS using Unity and C#.
- Integrate APIs, backend services, authentication and cloud features.
- Optimize performance, memory usage and user experience, and manage Android builds and deployment.

### Projects

| Proyecto (título corregido) | Categoría | Descripción                                                               | Links             |
| --------------------------- | --------- | ------------------------------------------------------------------------- | ----------------- |
| Roll a Ball                 | Unity 3D  | 3D scene where the player controls a ball.                                | Zoom, Code        |
| Architecture AR             | Unity AR  | Shows 3D architecture details using augmented reality with Vuforia.       | Zoom, Code        |
| Space Invaders Demo         | Unity 2D  | A 2D space shooter.                                                       | Zoom, Code        |
| 360 Image Visualizer        | Unity VR  | Displays 360° images using VR.                                            | Zoom, Code        |
| Art Gallery                 | Unity VR  | Explore an art gallery in VR.                                             | Zoom, Code        |
| FPS Zombies                 | Unity 3D  | First-person zombie shooter.                                              | Zoom, Code        |
| Simple Walking              | Unity VR  | Move around a 3D environment in VR without controllers.                   | Zoom, Code        |
| Collecting Coins & Minimap  | Unity 3D  | First-person item collection game with a minimap.                         | Zoom, Code        |
| Zig Zag 3D                  | Unity 3D  | Zig Zag game with procedural level generation.                            | Zoom, Code, Video |
| Fruit Ninja 2D              | Unity 2D  | Fruit-slicing game for PC and mobile.                                     | Zoom, Code, Video |
| Pong Game                   | Unity 2D  | Pong with player vs. player and player vs. machine modes.                 | Zoom, Code        |
| Space Shooter VR            | Unity VR  | Single-player VR space shooter with a scoring system.                     | Video             |
| Multiplayer VR              | Unity VR  | Shared 3D space for multiplayer interaction using Photon with voice chat. | Video             |
| Sword and Pistol VR         | Unity VR  | Beat Saber-style VR shooter and slicer with a scoring system.             | Video             |
| Alejandria Punk VR          | Unity VR  | Underwater-themed 3D roller coaster experience in VR.                     | Video             |

### Skills

| Grupo                           | Ítems                                                                                                                                             |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mobile Development              | Flutter, Dart, Android, iOS, Responsive UI, Custom widgets, Navigation & routing, Forms & validation                                              |
| Architecture & State Management | Bloc / Cubit, Provider, Clean Architecture, Feature-based architecture, Dependency Injection, Design systems                                      |
| Backend & Integrations          | REST APIs, JSON serialization, Firebase, Authentication, Payment integrations, Feature flags & Remote Config, Local storage                       |
| Unity & XR                      | Unity, C#, 2D & 3D gameplay systems, VR / AR / MR, Multiplayer (Photon), Performance profiling & optimization                                     |
| Tools & Practices               | Git & GitHub, Android Studio, VS Code, PlayFab, Unit & widget testing, Code reviews, Agile / Scrum, AI-assisted development (Claude Code, Cursor) |

### Services

| Servicio                             | Descripción                                                                                           |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------- |
| Flutter App Development              | Cross-platform apps for Android, iOS, web and desktop (Windows, macOS, Linux) from a single codebase. |
| Flutter Architecture & Modernization | Feature-based architecture, design systems, state management and refactoring of legacy code.          |
| API, Firebase & Payments Integration | REST APIs, Firebase services, authentication and third-party payment providers.                       |
| Unity Game Development               | 2D and 3D games for mobile and PC, from prototype to release.                                         |
| XR Development (AR / VR / MR)        | Immersive experiences for mobile devices and standalone headsets such as Meta Quest.                  |
| Multiplayer & Real-Time Systems      | Networked gameplay, matchmaking and real-time synchronization with Photon.                            |

**Llamada a la acción:** "Have a project in mind?" + botón "Let's talk".

### Education

- **Bachelor of Systems Engineering** — Military School of Engineering (EMI) · La Paz, Bolivia · 2017 – 2021
- **Certifications** (Udemy):
  - Master in Video Game Programming with Unity 2021 and C#
  - Multiplayer Virtual Reality (VR) Development with Unity
  - Master in Augmented Reality with Unity 2021
  - Build Multiplayer Games with Unity and Photon PUN 2
  - Design Patterns for Game Programming
- **Languages:** Spanish — Native · English — C1

### Contact y footer

| Ubicación | EN                                                                                                             |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| Título    | Contact                                                                                                        |
| Apertura  | I'm open to remote roles and freelance projects in Flutter and Unity. The fastest way to reach me is by email. |
| Botón     | Email me                                                                                                       |
| Location  | La Paz, Bolivia (GMT-4)                                                                                        |
| Email     | arommramirezz@gmail.com                                                                                        |
| Phone     | +591 69792487                                                                                                  |
| Social    | LinkedIn · GitHub · X · YouTube                                                                                |
| Footer    | © {año actual} Arom Mauricio Ramirez Zambrana · Back to top                                                    |

## Criterios de aceptación

- [x] CA1 — La página es de scroll continuo y muestra las secciones en el orden Hero → About → Experience → Projects → Skills → Services → Education → Contact → Footer.
- [x] CA2 — No existen la sección Interests, el bloque Summary, la columna vacía de Skills ni la página `portfolio-details.html`.
- [x] CA3 — Al hacer clic en un ítem del menú, la página se desplaza a esa sección y la URL muestra su ancla; con "reducir movimiento" el salto es instantáneo.
- [x] CA4 — Abrir `/#experience` (o cualquier ancla de la lista) carga la página en esa sección; `/#resume` lleva a Experience.
- [x] CA5 — El ítem del menú de la sección visible aparece como activo mientras se hace scroll.
- [x] CA6 — La barra muestra "Arom Ramirez" en una sola línea en escritorio y en móvil (375px).
- [x] CA7 — En móvil el menú se abre y cierra con el botón, se cierra al elegir un ítem, con `Esc` y tocando fuera, y el foco vuelve al botón.
- [x] CA8 — "View projects" y "Contact me" llevan a sus secciones; "Download CV" no aparece mientras el PDF no exista.
- [x] CA9 — La bio aparece una sola vez en la página; el teléfono aparece solo en Contact.
- [x] CA10 — Experience lista los 8 puestos en orden cronológico inverso por fecha de inicio, todos con el formato `Title — Company · Location · Mon YYYY – Mon YYYY|Present`.
- [x] CA11 — Cada tarjeta de proyecto muestra título, categoría, descripción y links sin pasar el mouse; los links tienen texto accesible.
- [x] CA12 — Los filtros de Projects funcionan con mouse y teclado; con JS deshabilitado se ven los 15 proyectos.
- [x] CA13 — Skills muestra 5 grupos; Services muestra 6 servicios y el botón "Let's talk" lleva a Contact.
- [x] CA14 — Education muestra el título, 5 certificaciones e idiomas.
- [x] CA15 — Contact muestra el botón "Email me" (`mailto:`), ubicación, email, teléfono y los 4 perfiles sociales; el footer muestra el año actual y "Back to top" lleva al inicio.
- [x] CA16 — Todos los textos visibles coinciden con la sección Textos aprobada.
- [x] CA17 — Sin scroll horizontal a 320px, 375px, 768px y 1280px; todo se puede recorrer con teclado y el foco es visible.
- [x] CA18 — Con JavaScript deshabilitado se puede leer todo el contenido y los links del menú funcionan como anclas.

## Fuera de alcance

- Estilo visual: colores, tipografías, diseño de tarjetas, imagen de fondo, íconos (specs de tokens y rediseño visual).
- Nueva foto y optimización de imágenes.
- Crear o actualizar el CV en PDF (lo prepara el dev; el botón aparece cuando exista).
- Proyectos Flutter (nueva spec cuando estén listos).
- Modo claro/oscuro, selector de idioma, SEO, formulario de contacto.

## Preguntas abiertas

Ninguna. Resueltas en la ronda 3 (2026-11-12): descripciones de los 4 proyectos VR (dadas por el dev), ubicación de Meru ("Remote, United States") y cifras de About sin nombre de empresa.
