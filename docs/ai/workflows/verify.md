# Workflow: verify (SDD 4/4)

Comprueba con evidencia que lo implementado cumple la spec y el plan. **No edita código.**

## Cómo se ve para el dev

1. Corre `/verify nombre-corto`.
2. La IA responde con el reporte (formato abajo) y la lista de lo que hay que verificar a mano.
3. El dev prueba lo manual y confirma. Recién ahí: spec → `Estado: implemented`, plan → `Estado: done`.

## Reglas

- Sin editar código ni tests. Si algo falla, se reporta y se sugiere `/implement nombre T<n>` o `/bugfix`.
- Cada veredicto lleva **evidencia**: `archivo:línea`, nombre del test, o salida de comando.
- Lo que solo se puede ver en el navegador (layout, contraste, foco, responsive) es 👀, salvo que se haya comprobado en el preview con captura.

## Pasos

1. Leer spec, plan y el diff (`git diff` + archivos nuevos sin trackear).
2. **Criterios de aceptación**: por cada uno, ✅ cumple / ❌ no cumple / 👀 verificar a mano, con evidencia.
3. **Plan**: tareas sin marcar; cambios en el diff que no están en el plan ni en "Desvíos".
4. **Reglas** sobre el diff: `AGENTS.md` → "Nunca", lista cerrada de carpetas, tokens, a11y, XSS, textos.
5. **Checks**: correr `npm run lint`, `npm run format:check`, `npm run test`.
6. Escribir el reporte:

```
## Verificación <nombre>
Criterios: ✅ n · ❌ n · 👀 n verificar a mano
Plan:      n/n tareas · n cambios fuera del plan
Reglas:    n hallazgos
Checks:    lint ✅ · format ✅ · test ✅

### Criterios
| # | Criterio | Estado | Evidencia |

### Fuera del plan
### Hallazgos de reglas
### Verificar a mano
- [ ] …
```

7. Cuando el dev confirma lo manual: actualizar `Estado` de spec (`implemented`) y plan (`done`).
