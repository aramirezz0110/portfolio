# Workflow: impact

Responde "¿qué puede romperse con este cambio?" y lo convierte en un checklist de pruebas manuales. No edita código.

## Cómo se ve para el dev

- `/impact` → analiza el diff actual.
- `/impact ruta/o/símbolo` → analiza ese archivo, función, clase CSS o token.
- La IA responde con el mapa de dependencias y un checklist de pruebas.

## Reglas

- Basado en evidencia: cada dependencia con `archivo:línea` (búsqueda de imports, clases CSS, `data-js`, tokens, claves i18n, ids/anchors).
- Incluir los estilos globales: `src/styles/base.css` afecta a todas las páginas (enlaces, encabezados, foco) y los tokens de `src/styles/tokens.css` a todo el sitio.
- Lo que no se puede determinar estáticamente se marca como "verificar a mano".

## Pasos

1. Listar lo cambiado: módulos y exports, clases CSS, tokens, atributos `data-*`, ids/anchors (`#about`…), claves i18n, archivos de `assets/`.
2. Buscar usos de cada uno en `src/`, `pages/`, HTML raíz y `assets/` (sin `assets/vendor/`).
3. Construir la tabla: cambio → dónde se usa → riesgo (alto/medio/bajo).
4. Checklist de pruebas manuales por página: navegación y anchors, estados, breakpoints (320/768/992/escritorio), teclado, tema oscuro y claro, idioma, JS deshabilitado si aplica.
5. Sugerir tests automatizables que falten.
