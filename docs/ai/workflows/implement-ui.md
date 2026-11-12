# Workflow: implement-ui

Para cambios **solo visuales**, sin lógica nueva, sin datos nuevos y sin navegación nueva (por ejemplo: rediseñar una sección, ajustar layout, nuevo estilo de tarjeta).

## Cómo se ve para el dev

1. Corre `/implement-ui descripción` y adjunta referencias visuales.
2. La IA propone el árbol y los tokens, y **espera aprobación**.
3. Con el OK, implementa y reporta qué revisar a mano.

## Reglas

- **Si aparece** lógica (filtrar, calcular, estado), un endpoint, navegación nueva o un cambio de comportamiento: **parar** y sugerir `/spec`.
- Reutilizar componentes y tokens existentes; tokens nuevos solo en `tokens.css`/`themes.css`.
- No tocar legado salvo que el cambio sea justamente sobre él y el dev lo apruebe.
- Revisar ambos temas, breakpoints y teclado.

## Pasos

1. Inspeccionar el HTML/CSS/componentes afectados.
2. Proponer: árbol página → secciones → componentes; qué se reutiliza; qué se crea; tokens que faltan (con valor en oscuro y claro); archivos a tocar.
3. **Esperar aprobación.**
4. Implementar. Correr `npm run lint` y `npm run format:check`.
5. Reportar cambios y qué verificar a mano (breakpoints, temas, foco). Sugerir `/commit`.
