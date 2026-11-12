# Workflow: review

Revisa el diff contra las reglas del proyecto. **No edita** salvo que el dev lo pida explícitamente.

## Cómo se ve para el dev

- `/review` → revisa los cambios sin commitear (`git diff` + archivos nuevos).
- `/review rama` o `/review archivo` → revisa ese objetivo.
- La IA responde con hallazgos ordenados por severidad.

## Reglas

- Cada hallazgo: severidad, `archivo:línea`, qué regla rompe (link a `AGENTS.md` o `docs/ai/…`), por qué importa y arreglo sugerido.
- No reportar gustos personales como hallazgos; si es opinión, va como "Sugerencia".
- Si hay una spec/plan asociado, verificar que el diff no se salga de él.

## Severidades

| Severidad     | Ejemplos                                                                                                          |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| 🔴 Bloqueante | XSS, secretos, bug funcional, rompe teclado o contraste, rompe el legado, falla un check                          |
| 🟠 Importante | Viola capas, lógica en el DOM sin test, carpeta fuera de la lista, color sin token, falta un estado (error/vacío) |
| 🟡 Menor      | Nombres, BEM, duplicación pequeña, docs desactualizadas                                                           |
| 💬 Sugerencia | Mejoras opcionales                                                                                                |

## Pasos

1. Obtener el diff y la lista de archivos.
2. Correr `npm run lint`, `npm run format:check`, `npm run test`.
3. Revisar contra: `AGENTS.md` ("Nunca", convenciones), `architecture.md` (carpetas, capas, feature → feature), `ui-conventions.md` (BEM, tokens, a11y, estados, temas), `data-layer.md`, `i18n.md`, `testing.md`.
4. Reportar: resumen (n por severidad + checks) y la lista de hallazgos.
