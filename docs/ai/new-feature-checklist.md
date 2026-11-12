# Checklist de feature nuevo

Antes de escribir código:

- [ ] Spec en `docs/specs/NNN-nombre/spec.md` con `Estado: approved`.
- [ ] Plan en `docs/specs/NNN-nombre/plan.md` con `Estado: approved`.
- [ ] Todas las rutas del plan están en la lista cerrada de `architecture.md`.
- [ ] Dependencias nuevas: ninguna, o aprobadas y justificadas en el plan.

Estructura:

- [ ] `src/features/<nombre>/<nombre>.page.js` como única entrada, cargado con `<script type="module">`.
- [ ] Componentes en `components/` (`initX` / `createX`), estado en `state.js`, datos en `services/`.
- [ ] CSS en `<nombre>.css` con BEM; solo tokens; tokens nuevos anotados en el plan.
- [ ] Reutilizado lo que ya existe en `shared/` antes de crear algo nuevo.

Comportamiento:

- [ ] Estados loading / error / vacío / éxito (si aplica).
- [ ] Responsive: 320px, 768px, 992px, escritorio.
- [ ] Teclado completo y foco visible; `aria-*` donde corresponda.
- [ ] Modo oscuro (por defecto) y claro, contraste AA en ambos.
- [ ] Textos en el HTML en inglés; traducibles marcados para i18n (cuando exista).
- [ ] Funciona (degradado aceptable) con JS deshabilitado si el contenido es estático.

Calidad:

- [ ] Tests de utils, state y services.
- [ ] `npm run check` en verde.
- [ ] `/verify` sin ❌; lo 👀 revisado por el dev.
- [ ] Mensaje de commit propuesto con `/commit`.
