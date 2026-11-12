import { createProjectFilterState, isProjectVisible } from '../state.js';

/**
 * Activa los filtros de proyectos. La barra viene con `hidden` en el HTML: sin JS no se muestra
 * y se ven todos los proyectos.
 *
 * @param {HTMLElement} root Elemento [data-js="projects"].
 * @returns {{ destroy(): void }}
 */
export function initProjectFilter(root) {
  const bar = root.querySelector('[data-js="project-filters"]');
  const buttons = [...bar.querySelectorAll('button[data-filter]')];
  const items = [...root.querySelectorAll('[data-categories]')];
  const state = createProjectFilterState();

  function render(filter) {
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
    });
    items.forEach((item) => {
      item.hidden = !isProjectVisible(item.dataset.categories.split(' '), filter);
    });
  }

  const onClick = (event) => {
    const button = event.target.closest('button[data-filter]');
    if (button) state.setFilter(button.dataset.filter);
  };

  const unsubscribe = state.subscribe(render);
  bar.addEventListener('click', onClick);
  bar.hidden = false;
  render(state.getFilter());

  return {
    destroy() {
      unsubscribe();
      bar.removeEventListener('click', onClick);
    },
  };
}
