@AGENTS.md

## Específico de Claude Code

- **Slash commands:** `.claude/commands/` (`/spec`, `/plan`, `/implement`, `/verify`, `/implement-ui`, `/bugfix`, `/review`, `/commit`, `/impact`). Son wrappers finos: el procedimiento real está en `docs/ai/workflows/<comando>.md`. Si cambias un procedimiento, edita el workflow, no el command (y mantén `.cursor/commands/` idéntico).
- **Hook de formato:** `.claude/settings.json` corre `scripts/format-edited-file.mjs` después de cada `Edit`/`Write`: aplica Prettier al archivo editado respetando `.prettierignore` (el legado no se reformatea). No hace falta correr Prettier a mano archivo por archivo; sí correr `npm run check` al cerrar una tarea.
- **Node:** el proyecto usa Node 26 vía `fnm` (`.nvmrc`). Si `node` no está en el PATH, `eval "$(fnm env --shell zsh)"`.
- **Preview:** `.claude/launch.json` corre `python3 -m http.server 8765` (lo mismo que `npm run dev`, sin depender de que `node` esté en el PATH de la app).
- **Personal:** preferencias propias van en `CLAUDE.local.md` y permisos locales en `.claude/settings.local.json` (ambos en `.gitignore`).
