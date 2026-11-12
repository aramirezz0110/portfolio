# Workflow: bugfix

## Cómo se ve para el dev

1. Corre `/bugfix descripción` (qué pasa, qué debería pasar, cómo reproducirlo, navegador/dispositivo).
2. La IA responde con la causa raíz, el arreglo propuesto y su riesgo, y **espera aprobación**.
3. Con el OK: test que falla → arreglo → test en verde → reporte.

## Reglas

- **Causa raíz con evidencia** (`archivo:línea`, reproducción) antes de tocar nada. Sin evidencia, no hay arreglo: se dice qué falta para reproducir.
- **Arreglo mínimo**: solo lo necesario para corregir la causa. Sin refactors.
- **Primero un test que falle** que reproduzca el bug; después el arreglo. Si el bug es puramente visual y no es testeable, se dice explícitamente y se describe la verificación manual.
- Si el "bug" es en realidad un cambio de comportamiento no especificado, sugerir `/spec`.
- Si el bug está en código legado, el arreglo mínimo se hace en el legado (no se migra como parte del fix).

## Pasos

1. Reproducir (preview, test o lectura del código). Anotar pasos exactos.
2. Encontrar la causa raíz; citar `archivo:línea`.
3. Proponer: arreglo mínimo, archivos, riesgo (qué más podría romperse) y test. **Esperar aprobación.**
4. Escribir el test; comprobar que falla por la razón correcta.
5. Aplicar el arreglo; el test pasa.
6. `npm run check`. Reportar causa, arreglo, test y qué verificar a mano. Sugerir `/impact` si toca código compartido y `/commit`.
