# Workflow: plan (SDD 2/4)

El plan traduce una spec aprobada en archivos y **tareas pequeñas ordenadas**. Dice **cómo**, nunca cambia el **qué**.

## Cómo se ve para el dev

1. Corre `/plan nombre-corto` (o `NNN-nombre-corto`).
2. La IA escribe `docs/specs/NNN-nombre-corto/plan.md` con `Estado: draft` y responde con la ruta, el número de tareas y las "Decisiones a confirmar".
3. El dev revisa, responde las decisiones y cambia el estado a `approved`.

## Reglas

- **Exige** `spec.md` con `Estado: approved`. Si no, parar y decirlo.
- **Reutilizar antes de crear**: buscar en `src/shared/`, `src/features/` y `src/styles/tokens.css` antes de proponer algo nuevo.
- Cada ruta del plan se contrasta con la **lista cerrada de carpetas** (`docs/ai/architecture.md`). Lo que no encaje va a "Decisiones a confirmar".
- Si a la spec le falta algo (un texto, una rama, un dato), **parar** y pedir que se actualice la spec. No rellenar huecos en el plan.
- Dependencias nuevas: solo en "Decisiones a confirmar", con motivo y alternativa sin dependencia.
- Tareas pequeñas: cada una toca pocos archivos, se puede revisar sola y tiene una línea "Listo cuando" verificable.

## Contenido del plan

Usa `docs/specs/_template/plan.md`:

- **UI:** árbol por página → secciones → componentes, marcando cuáles se reutilizan; tokens nuevos; skeletons.
- **Archivos:** tabla crear / modificar con motivo.
- **Estado:** forma del estado, acciones, getters derivados.
- **Datos:** tabla fuente/endpoint → service → manejo de error (o "contenido estático en HTML").
- **Tests:** qué se testea y dónde.
- **Tareas:** orden típico: scaffold → datos → estado → UI por página → wiring (navegación) → textos/i18n → tests → limpieza.

## Pasos

1. Leer `spec.md` y verificar `Estado: approved`.
2. Leer `AGENTS.md`, `docs/ai/` relevante y el código que la spec toca.
3. Listar qué existe y se reutiliza.
4. Diseñar UI, estado y datos; validar rutas contra la lista cerrada.
5. Escribir tareas `- [ ] **T1 · título** — archivos. Listo cuando: …`.
6. Escribir `plan.md` con `Estado: draft` y responder con ruta, nº de tareas y decisiones a confirmar. Esperar aprobación.
