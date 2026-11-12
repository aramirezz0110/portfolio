# Spec: Tokens y estilos

- **Estado:** implemented <!-- draft | approved | implemented -->
- **Fecha:** 2026-11-12
- **Tipo:** rediseño técnico (sin flujo ni datos nuevos; spec corta)
- **Ubicación:** `index.html` completo (estilos de todas las secciones, fuentes, imágenes y scripts de vendor)

## Objetivo

Que todo el aspecto del sitio salga de los tokens de diseño, sin colores ni fuentes sueltos y sin CSS legado, para que la futura spec de modo claro/oscuro (003) solo tenga que reasignar tokens. De paso se limpian los restos que dejó la 001 (imágenes sin dimensiones, scripts y vendor sin uso).

## Contexto actual

- Continúa la spec `001-contenido-y-estructura` (`implemented`).
- El CSS legado (275 líneas) sigue cargado y excluido de lint y Prettier. Tiene unos 20 colores literales y 6 declaraciones de fuente literales. Varios colores no están en la paleta de tokens: verde `#4ceb95` (línea de títulos), gris al 10 % (fondo de tarjetas de Services) y blanco al 8 %, 15 % y 50 %.
- La página depende de clases del legado: título de sección (×7), About, ítems de Resume, tarjetas de Services (×6) y tarjetas de Contact (×4). También del fondo fijo con imagen y del panel negro al 90 % detrás de cada sección.
- Parte de las reglas del legado ya no coinciden con nada del HTML (por ejemplo, encabezados `h4`/`h5` de Resume y Services, el ícono de Services y el título de Resume).
- Solo están enlazados los tokens; los estilos base y el tema claro existen pero no se cargan.
- Google Fonts carga 3 familias × 8 variantes con la API antigua.
- Las 16 imágenes no tienen `width`/`height` (saltos de layout al cargar).
- El JS de Bootstrap se carga sin que nada lo use y la librería Waypoints quedó en el repo sin uso.

## Flujo

No cambia: es el de la spec 001. Entrada, acciones, salida y reentrada son las mismas.

- **Condiciones:** sin JS el sitio se ve igual que con JS (solo CSS). El tema oscuro sigue siendo el único activo; el claro solo se puede forzar a mano para verificar (atributo en `<html>`), no hay selector.

## Decisiones (ronda 1, aceptadas por el dev)

| #   | Tema                     | Decisión                                                                                                                                                                                                                                                     |
| --- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Tipo                     | Spec corta (no `/implement-ui`): toca convenciones y lint y es requisito de la 003.                                                                                                                                                                          |
| 2   | Cambio visual            | En oscuro, sin cambios perceptibles salvo las unificaciones de color (#3), el anillo de foco (#6) y el texto sobre el acento (#13).                                                                                                                          |
| 3   | Colores fuera de paleta  | Se unifican al token más cercano: `#4ceb95` → acento; blanco 8 % / 15 % y gris 10 % → superficie (blanco 10 %); blanco 50 % → texto atenuado (70 %). Solo se crea un semántico nuevo si la diferencia se nota.                                               |
| 4   | Destino del legado       | Sus reglas vivas pasan al CSS del feature `home`, con nombres BEM; el HTML se ajusta a esos nombres y el archivo legado se elimina, junto con sus exclusiones de lint y Prettier.                                                                            |
| 5   | Reglas muertas           | Se eliminan; la lista va en el plan.                                                                                                                                                                                                                         |
| 6   | Estilos base             | Se enlazan. Se acepta el anillo de foco visible; el resto del reset no debe romper el layout.                                                                                                                                                                |
| 7   | Tema claro               | Se enlaza ya (sin efecto sin el atributo). Sus valores y contraste se validan en la 003.                                                                                                                                                                     |
| 8   | "Listo para la 003"      | Con el tema claro forzado a mano, ningún elemento queda con un color fijo del tema oscuro. La estética del claro no se evalúa aquí.                                                                                                                          |
| 9   | Fondo con imagen y panel | Se mantienen iguales, con colores vía token. Su versión clara la decide la 003.                                                                                                                                                                              |
| 10  | Tamaños y espaciados     | Colores y fuentes siempre a tokens. Tamaños y espacios solo donde coincidan con la escala existente; no se crean tokens para valores únicos.                                                                                                                 |
| 11  | Google Fonts             | API nueva, solo los pesos/estilos usados, con `display=swap`.                                                                                                                                                                                                |
| 12  | Hallazgos de la 001      | Entran los tres: `width`/`height` en las 16 imágenes, quitar el JS de Bootstrap y borrar Waypoints.                                                                                                                                                          |
| 13  | Texto sobre el acento    | Se corrige aquí: todo texto o ícono sobre fondo verde de acento (hover de Services, botones, filtros activos, íconos sociales en hover, ícono de Services) pasa de blanco a oscuro, cambiando el token de "texto sobre acento". Contraste ≥ 4.5:1 en oscuro. |

## Páginas y estados

### index.html (todas las secciones)

- **Datos:** HTML estático; sin cambios de contenido ni de textos.
- **Loading / Error / Vacío:** no aplica (estático). Las imágenes reservan su espacio antes de cargar.
- **Éxito:** la página se ve como hoy en oscuro (con las excepciones #3 y #6).
- **Responsive:** sin regresiones a 320 / 768 / 992 / escritorio; sin scroll horizontal a 320 px. Las imágenes mantienen su proporción al escalar.
- **Temas:** oscuro = actual. Claro forzado: todo responde a los tokens (criterio #8).
- **Notas:** al navegar con teclado, cada link y botón muestra el anillo de foco del sistema de tokens.

## Endpoints

No aplica: contenido estático.

## Textos

No cambian.

## Criterios de aceptación

- [ ] CA1 — El archivo CSS legado ya no existe ni se carga, y no queda ninguna exclusión de lint/Prettier que lo mencione.
- [ ] CA2 — Fuera del archivo de tokens no hay colores literales ni familias tipográficas literales (lo garantiza el lint).
- [ ] CA3 — `npm run check` pasa sin errores.
- [ ] CA4 — En tema oscuro, comparando capturas antes/después a 320, 768, 992 y 1280 px, no hay diferencias perceptibles salvo las de las decisiones #3, #6 y #13.
- [ ] CA5 — Con el tema claro forzado a mano, fondo, paneles, textos, bordes, acentos y tarjetas cambian según los tokens; ningún elemento conserva un color fijo del oscuro (salvo la imagen de fondo, decisión #9).
- [ ] CA6 — Se cargan, en orden: vendor → tokens → tema claro → base → CSS del feature.
- [ ] CA7 — Navegando con Tab, cada elemento interactivo muestra un foco visible.
- [ ] CA8 — Las 16 imágenes tienen `width` y `height` acordes a su proporción real y no hay saltos de layout al cargar.
- [ ] CA9 — Ya no se carga el JS de Bootstrap ni existe Waypoints en el repo; menú móvil, filtros y galería siguen funcionando.
- [ ] CA10 — Google Fonts pide solo las variantes usadas, con `display=swap`, y los textos se ven con las mismas fuentes que antes.
- [ ] CA11 — Sin JavaScript la página se ve igual que con JavaScript (salvo filtros y galería, como en la 001).
- [ ] CA12 — En tema oscuro, todo texto o ícono sobre fondo de acento (en reposo y en hover) tiene contraste ≥ 4.5:1 (texto) o ≥ 3:1 (íconos).

## Fuera de alcance

- Selector de tema, persistencia y valores/contraste del tema claro (spec 003).
- Cambios de contenido, textos o estructura de secciones.
- Unificar los dos sets de íconos (Boxicons y Bootstrap Icons).
- Rediseño visual de cualquier sección.

## Preguntas abiertas

Ninguna.
