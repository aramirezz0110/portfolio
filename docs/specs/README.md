# Specs

Todo trabajo que cambia **qué** hace el sitio pasa por aquí: **spec → plan → implement → verify**, con aprobación del dev entre cada paso.

## Cómo se usa `/spec` (entrevista en 5 pasos)

1. Corre `/spec nombre-corto`. **Solo el nombre** en el comando.
2. La IA te dice la carpeta (`docs/specs/NNN-nombre-corto/`) y te pide el contexto.
3. En el **mensaje siguiente** pega: qué quieres, por qué, contexto y referencias visuales (capturas, mockups, links).
4. La IA revisa el código y te hace todas las preguntas que faltan, en rondas numeradas.
5. La IA escribe `spec.md` (`Estado: draft`) y te da un resumen y las preguntas abiertas. La lees y cambias el estado a `approved` cuando esté bien.

Después: `/plan nombre-corto` → aprobar → `/implement nombre-corto` → `/verify nombre-corto` → tu revisión → `/commit`.

## Estructura

```
docs/specs/
├── README.md
├── _template/
│   ├── spec.md
│   └── plan.md
├── 001-nombre-corto/
│   ├── spec.md
│   └── plan.md
└── 002-otro-nombre/
```

`NNN` es incremental (`001`, `002`…) y el nombre en kebab-case.

## Flujo por tipo de tarea

| Tipo de tarea                         | Pasos                                                                                           |
| ------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Feature nuevo o rediseño              | `/spec` → aprobar → `/plan` → aprobar → `/implement` → `/verify` → revisión del dev → `/commit` |
| Página nueva en feature existente     | `/spec` (corta) → `/plan` → `/implement` → `/verify` → `/commit`                                |
| Solo UI, sin lógica nueva             | `/implement-ui` → `/commit`                                                                     |
| Bugfix                                | `/bugfix` → `/commit`                                                                           |
| Cambio chico (texto, color, un campo) | Directo y `/commit`                                                                             |

## Cambios después de aprobar

- Si cambia **qué** hace (comportamiento, flujo, endpoint, criterio de aceptación) → se actualiza **la spec** y después el plan.
- Si cambia **cómo** (detalle de UI o de implementación) → se pide en `/implement` y queda anotado en "Desvíos" del plan.
- Si la misma corrección se repite entre features, falta una regla: llevarla a `AGENTS.md`, a `docs/ai/` o, mejor, a un lint.

## Ciclo de vida

| Documento | Estados                                       |
| --------- | --------------------------------------------- |
| spec      | `draft` → `approved` → `implemented`          |
| plan      | `draft` → `approved` → `in progress` → `done` |

Solo el dev pasa algo a `approved`. Una spec mergeada (`implemented`) no se reescribe: un cambio posterior tiene su propia spec, que enlaza a la anterior en "Contexto actual".

## Primeras specs sugeridas

1. `001-tokens-y-estilos` — pasar colores hex y `style=""` inline del legado a tokens (requisito del modo claro/oscuro).
2. `002-modo-oscuro` — selector de tema (oscuro por defecto) con `theme-init.js`.
3. `003-selector-idioma` — inglés por defecto + español.
4. `004-migrar-main-js` — de IIFE a ES modules en `src/features/`.
5. `005-seo` — sitemap, robots, JSON-LD.
