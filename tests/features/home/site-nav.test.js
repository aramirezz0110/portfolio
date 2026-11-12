import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { initSiteNav } from '../../../src/features/home/components/site-nav.js';

function renderPage() {
  document.body.replaceChildren();
  const template = document.createElement('template');
  // Markup de prueba equivalente al de index.html (sin datos externos).
  template.content.append(
    ...new DOMParser().parseFromString(
      `<header data-js="site-header">
        <a href="#hero">Arom Ramirez</a>
        <button type="button" data-js="nav-toggle" aria-expanded="false" aria-label="Open menu"
          data-label-open="Open menu" data-label-close="Close menu" hidden>menu</button>
        <nav data-js="site-nav"><ul>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
        </ul></nav>
      </header>
      <main>
        <section id="hero"></section>
        <section id="about"></section>
        <section id="experience"></section>
      </main>
      <p id="outside">outside</p>`,
      'text/html',
    ).body.childNodes,
  );
  document.body.append(template.content);
  return {
    header: document.querySelector('[data-js="site-header"]'),
    toggle: document.querySelector('[data-js="nav-toggle"]'),
    link: document.querySelector('a[href="#about"]'),
  };
}

let nav;

beforeEach(() => {
  window.history.replaceState(null, '', '/');
});

afterEach(() => {
  nav?.destroy();
  nav = undefined;
});

describe('initSiteNav', () => {
  it('marca la barra como mejorada y muestra el botón', () => {
    const { header, toggle } = renderPage();
    nav = initSiteNav(header);

    expect(header.dataset.enhanced).toBe('true');
    expect(toggle.hidden).toBe(false);
  });

  it('abre y cierra el menú con el botón', () => {
    const { header, toggle } = renderPage();
    nav = initSiteNav(header);

    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    expect(toggle.getAttribute('aria-label')).toBe('Close menu');
    expect(header.classList.contains('site-header--open')).toBe(true);

    toggle.click();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-label')).toBe('Open menu');
  });

  it('cierra con Escape y devuelve el foco al botón', () => {
    const { header, toggle } = renderPage();
    nav = initSiteNav(header);

    toggle.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });

  it('cierra al elegir un link', () => {
    const { header, toggle, link } = renderPage();
    nav = initSiteNav(header);

    toggle.click();
    link.click();

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('cierra al hacer clic fuera del menú', () => {
    const { header, toggle } = renderPage();
    nav = initSiteNav(header);

    toggle.click();
    document.getElementById('outside').click();

    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(document.activeElement).toBe(toggle);
  });

  it('traduce el ancla antigua #resume a #experience y hace scroll a la sección', () => {
    window.history.replaceState(null, '', '/#resume');
    const { header } = renderPage();
    const scrollIntoView = vi.fn();
    document.getElementById('experience').scrollIntoView = scrollIntoView;
    nav = initSiteNav(header);

    expect(window.location.hash).toBe('#experience');
    expect(scrollIntoView).toHaveBeenCalledOnce();
  });

  it('marca aria-current en el link de la última sección al final de la página', () => {
    const { header } = renderPage();
    nav = initSiteNav(header);

    // En jsdom todo mide 0: la página entera cuenta como "al final".
    expect(document.querySelector('a[href="#experience"]').getAttribute('aria-current')).toBe(
      'true',
    );
    expect(document.querySelector('a[href="#about"]').hasAttribute('aria-current')).toBe(false);
  });
});
