import { afterEach, describe, expect, it } from 'vitest';
import { initProjectFilter } from '../../../src/features/home/components/project-filter.js';

function renderProjects() {
  const doc = new DOMParser().parseFromString(
    `<section data-js="projects">
      <div data-js="project-filters" hidden>
        <button type="button" data-filter="all">All</button>
        <button type="button" data-filter="unity-3d">Unity 3D</button>
        <button type="button" data-filter="unity-xr">Unity VR - AR</button>
      </div>
      <article data-categories="unity-3d">A</article>
      <article data-categories="unity-xr">B</article>
      <article data-categories="unity-2d">C</article>
    </section>`,
    'text/html',
  );
  document.body.replaceChildren(doc.querySelector('section'));
  return document.querySelector('[data-js="projects"]');
}

const visibleTexts = (root) =>
  [...root.querySelectorAll('[data-categories]')]
    .filter((el) => !el.hidden)
    .map((el) => el.textContent);

let filter;

afterEach(() => {
  filter?.destroy();
  filter = undefined;
});

describe('initProjectFilter', () => {
  it('muestra la barra y empieza con "All" activo', () => {
    const root = renderProjects();
    filter = initProjectFilter(root);

    expect(root.querySelector('[data-js="project-filters"]').hidden).toBe(false);
    expect(root.querySelector('[data-filter="all"]').getAttribute('aria-pressed')).toBe('true');
    expect(visibleTexts(root)).toEqual(['A', 'B', 'C']);
  });

  it('filtra por categoría y actualiza aria-pressed', () => {
    const root = renderProjects();
    filter = initProjectFilter(root);

    root.querySelector('[data-filter="unity-xr"]').click();

    expect(visibleTexts(root)).toEqual(['B']);
    expect(root.querySelector('[data-filter="unity-xr"]').getAttribute('aria-pressed')).toBe(
      'true',
    );
    expect(root.querySelector('[data-filter="all"]').getAttribute('aria-pressed')).toBe('false');
  });

  it('"All" vuelve a mostrar todos', () => {
    const root = renderProjects();
    filter = initProjectFilter(root);

    root.querySelector('[data-filter="unity-3d"]').click();
    root.querySelector('[data-filter="all"]').click();

    expect(visibleTexts(root)).toEqual(['A', 'B', 'C']);
  });
});
