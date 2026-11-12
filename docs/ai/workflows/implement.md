# Workflow: implement (SDD 3/4)

Ejecuta el plan aprobado, tarea por tarea, sin salirse de él.

## Cómo se ve para el dev

- `/implement nombre-corto` → implementa todas las tareas pendientes en orden.
- `/implement nombre-corto T3` → implementa solo esa tarea.
- La IA reporta tras cada tarea (o al final): qué hizo, lint, y qué probar a mano.

## Reglas

- **Exige** `plan.md` con `Estado: approved` (o `in progress` si se retoma). Al empezar, lo pasa a `in progress`.
- Solo se tocan los archivos que la tarea lista. Nada de refactors oportunistas ni legado.
- **Si algo no está en el plan** (un archivo más, un token, un cambio de enfoque): parar, explicar y proponer. Con el OK del dev, actualizar el plan y anotarlo en "Desvíos" (qué, por qué, aprobado el AAAA-MM-DD).
- Si lo que falta es de **comportamiento** (qué hace), no es un desvío: se actualiza la spec primero (ver `docs/specs/README.md`).
- Cumplir `AGENTS.md` → "Nunca" y `docs/ai/ui-conventions.md`.
- No hacer commit.

## Pasos

1. Leer spec, plan, `AGENTS.md` y los `docs/ai/` relevantes. Verificar estado del plan; pasarlo a `in progress`.
2. Por cada tarea (o la indicada):
   1. Implementar solo lo que dice.
   2. Escribir/actualizar sus tests si la tarea los incluye.
   3. Correr `npm run lint` (o el linter del tipo de archivo tocado) y corregir.
   4. Comprobar el "Listo cuando".
   5. Marcar `- [x]` en el plan.
3. Al terminar todas: `npm run check`.
4. Reportar: tareas hechas, desvíos, salida de `npm run check` y lista de **qué probar a mano** (por página: estados, responsive, teclado, temas, idioma). Sugerir `/verify`.
