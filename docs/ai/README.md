# docs/ai — Índice

Documentación para cualquier persona o IA que trabaje en este repo. `AGENTS.md` es el resumen; aquí está el detalle.

| Archivo                                              | Contenido                                                         |
| ---------------------------------------------------- | ----------------------------------------------------------------- |
| [architecture.md](architecture.md)                   | Capas, lista cerrada de carpetas, dependencias permitidas, legado |
| [ui-conventions.md](ui-conventions.md)               | Componentes, tokens, CSS/BEM, responsive, temas, estados, a11y    |
| [state.md](state.md)                                 | Estado por feature, getters derivados, eventos                    |
| [data-layer.md](data-layer.md)                       | `core/http.js`, services, errores tipados, timeouts, reintentos   |
| [env-and-secrets.md](env-and-secrets.md)             | Configuración pública, secretos, npm seguro, Node                 |
| [i18n.md](i18n.md)                                   | Idiomas (inglés por defecto, español opcional)                    |
| [testing.md](testing.md)                             | Qué se testea y cómo                                              |
| [new-feature-checklist.md](new-feature-checklist.md) | Checklist para un feature nuevo                                   |

## Workflows (procedimientos de los slash commands)

| Paso     | Archivo                                                | Comando         |
| -------- | ------------------------------------------------------ | --------------- |
| SDD 1/4  | [workflows/spec.md](workflows/spec.md)                 | `/spec`         |
| SDD 2/4  | [workflows/plan.md](workflows/plan.md)                 | `/plan`         |
| SDD 3/4  | [workflows/implement.md](workflows/implement.md)       | `/implement`    |
| SDD 4/4  | [workflows/verify.md](workflows/verify.md)             | `/verify`       |
| Solo UI  | [workflows/implement-ui.md](workflows/implement-ui.md) | `/implement-ui` |
| Bug      | [workflows/bugfix.md](workflows/bugfix.md)             | `/bugfix`       |
| Revisión | [workflows/review.md](workflows/review.md)             | `/review`       |
| Commit   | [workflows/commit.md](workflows/commit.md)             | `/commit`       |
| Impacto  | [workflows/impact.md](workflows/impact.md)             | `/impact`       |

Los commands de `.claude/commands/` y `.cursor/commands/` solo apuntan a estos archivos. Para cambiar un procedimiento, edita el workflow.

## Si la misma corrección se repite

Si corriges lo mismo en dos features, falta una regla. Llévala, en este orden de preferencia, a: un lint (`eslint.config.js`, `.stylelintrc.json`, `.htmlhintrc`) → `docs/ai/` → `AGENTS.md`.
