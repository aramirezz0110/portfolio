# Workflow: commit

Propone el mensaje de commit. **Nunca** hace commit ni push por su cuenta.

## Cómo se ve para el dev

1. Corre `/commit` (opcionalmente con una nota).
2. La IA responde con el mensaje propuesto, los archivos que entrarían y avisos (archivos que no deberían ir, checks fallando, rama incorrecta).
3. El dev decide y hace el commit. Si el dev pide explícitamente "haz el commit", la IA puede ejecutarlo con ese mensaje, nunca push sin pedirlo.

## Reglas

- **Conventional Commits** en inglés: `type(scope opcional): resumen en imperativo, minúscula, sin punto, ≤ 72 caracteres`.
- Tipos: `feat`, `fix`, `docs`, `style` (solo formato), `refactor`, `test`, `chore`, `perf`, `build`, `ci`.
- Cuerpo opcional: el porqué y lo relevante para quien revise; referencia a la spec (`Spec: docs/specs/NNN-nombre/`).
- Un commit = un cambio coherente. Si el diff mezcla cosas, proponer dividirlo.
- Rama: si se está en `master` con un feature o fix, sugerir `feat/nombre-corto` o `fix/nombre-corto` antes de commitear.

## Pasos

1. `git status` y `git diff` (incluido lo staged).
2. Avisar si hay: secretos, `.env`, `CLAUDE.local.md`, archivos ajenos a la tarea, checks fallando (`npm run check`).
3. Proponer rama (si aplica) y mensaje en un bloque listo para copiar.
