# Workflow: spec (SDD 1/4)

Una spec describe **qué** hace algo y **cómo se comporta**, no cómo se programa. Se escribe como una **entrevista**: la IA pregunta hasta completar el checklist de flujo.

## Cómo se ve para el dev

1. Corre `/spec nombre-corto` (solo el nombre).
2. La IA responde: la carpeta que va a usar (`docs/specs/NNN-nombre-corto/`) y pide el contexto.
3. En el mensaje siguiente el dev pega: descripción, contexto, referencias visuales (capturas, mockups, links).
4. La IA revisa el código y responde con **todas** las preguntas que faltan, numeradas. Se repite en rondas hasta cubrir el checklist.
5. La IA escribe `spec.md` con `Estado: draft` y responde con la ruta, un resumen de 5 líneas y las preguntas abiertas. El dev la lee, pide cambios o la aprueba (`Estado: approved`).

## Reglas

- **Nunca inventar** endpoints, campos, reglas de negocio, textos ni navegación. Lo no dicho va a "Preguntas abiertas".
- **Sin código ni nombres de archivos**: eso es del plan.
- **Corta**: que se lea en minutos. Tablas y listas antes que prosa.
- **No pasar al plan** sin `Estado: approved` puesto por el dev.
- Textos visibles: en inglés (idioma por defecto del sitio), copiados del dev; si no los dio, son pregunta abierta.
- Si `docs/specs/NNN-nombre-corto/spec.md` ya existe, **retomarla**: leerla, mostrar qué falta y seguir la entrevista. No crear otra.
- Una spec ya mergeada con `Estado: implemented` no se reescribe: un cambio posterior tiene su propia spec.

## Clasificación (primer paso)

| Tipo                                  | Qué hacer                                               |
| ------------------------------------- | ------------------------------------------------------- |
| Feature nuevo                         | Spec completa                                           |
| Rediseño                              | Spec completa; "Contexto actual" describe lo que existe |
| Página nueva en feature existente     | Spec corta (solo la página nueva y su flujo)            |
| Cambio de comportamiento              | Spec corta centrada en el antes/después                 |
| Solo UI, sin lógica nueva             | Sugerir `/implement-ui` y parar                         |
| Bug                                   | Sugerir `/bugfix` y parar                               |
| Cambio chico (texto, color, un campo) | Sugerir hacerlo directo y `/commit`                     |

## Checklist de flujo (la entrevista termina cuando todo está cubierto o en "Preguntas abiertas")

- **Entrada:** desde dónde llega el usuario (página, link, botón, URL directa).
- **Páginas/secciones:** cuántas, en qué orden, referencia visual de cada una.
- **Acciones:** cada botón, link, input, submit y su resultado.
- **Ramas:** éxito, error de negocio, error de red, vacío, cancelar, timeout (las que apliquen).
- **Condiciones:** auth, permisos, flags, JS deshabilitado.
- **Datos:** de dónde sale cada dato (HTML estático, endpoint, estado existente, URL, `localStorage`).
- **Salida:** dónde termina y qué se refresca.
- **Reentrada:** qué pasa si sale a mitad y vuelve (recarga, botón atrás, link compartido).
- **Responsive y accesibilidad:** comportamiento por breakpoint (320 / 768 / 992 / escritorio), teclado, lector de pantalla.
- **Temas e idioma:** cómo se ve en oscuro (defecto) y claro; qué textos se traducen.

## Pasos

1. Determinar `NNN`: siguiente número libre en `docs/specs/`. Carpeta: `docs/specs/NNN-nombre-corto/`.
2. Si existe la spec, retomarla. Si no, pedir el contexto y esperar el mensaje del dev.
3. Leer `AGENTS.md`, `docs/ai/architecture.md`, `docs/ai/ui-conventions.md` y el código relacionado (HTML, features, shared).
4. Clasificar la tarea. Si no corresponde spec, sugerir el comando adecuado y parar.
5. Hacer todas las preguntas pendientes del checklist en una lista numerada. Repetir en rondas solo con lo que falte.
6. Escribir `spec.md` desde `docs/specs/_template/spec.md`, `Estado: draft`, fecha de hoy.
7. Responder con: ruta, resumen de 5 líneas, preguntas abiertas. Esperar aprobación.
