# Estado

## Patrón

**Estado en módulo por feature** (`features/<f>/state.js`). Para un sitio estático alcanza; no hay store global.

```js
// features/portfolio/state.js — ejemplo ilustrativo
const state = { filter: 'all', items: [] };
const listeners = new Set();

export function getState() {
  return state;
}

export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function setFilter(filter) {
  state.filter = filter;
  listeners.forEach((listener) => listener(state));
}

// Getter derivado: puro, recibe el estado, con test.
export function selectVisibleItems({ filter, items }) {
  return filter === 'all' ? items : items.filter((item) => item.category === filter);
}
```

## Reglas

- **Acciones** (`setX`, `toggleX`) son la única forma de cambiar el estado. Nada muta el estado desde un componente.
- **Getters derivados** (`selectX(state)`) son funciones puras que reciben el estado: se testean sin DOM. No se guarda en el estado lo que se puede derivar.
- `state.js` no toca el DOM ni llama a services: la página (`<f>.page.js`) orquesta `service → acción → render`.
- Si dos features necesitan el mismo pub/sub, se crea `core/store.js` (`createStore(initial)` con `getState`, `setState`, `subscribe`) en esa spec y se migra; no antes.
- Estado que debe sobrevivir a la recarga (tema, idioma): `localStorage` con `try/catch` (puede estar bloqueado) y valor por defecto de `core/config.js`.
- Estado que debe poder compartirse por URL (filtro, pestaña): en `location.hash` o query, no solo en memoria.

## Eventos entre features

Los features no se importan entre sí. Si uno debe enterarse de algo de otro (por ejemplo, cambio de idioma o tema), se usa un `CustomEvent` en `document` con nombre `portfolio:<evento>` (`portfolio:locale-change`, `portfolio:theme-change`), documentado en la spec que lo crea.
