import { pickActiveSection, resolveSectionHash } from '../state.js';

/**
 * Mejora la barra de navegación fija:
 * - menú móvil (botón, Esc, clic fuera, cierre al elegir un link, foco de vuelta al botón);
 * - marca con aria-current el link de la sección visible;
 * - traduce anclas antiguas (#resume, #header) al cargar y al cambiar el hash.
 * Sin JS la barra funciona como lista de anclas (el colapso móvil depende de data-enhanced).
 *
 * @param {HTMLElement} header Elemento [data-js="site-header"].
 * @param {{ win?: Window }} [deps]
 * @returns {{ destroy(): void }}
 */
export function initSiteNav(header, { win = window } = {}) {
  const doc = header.ownerDocument;
  const toggle = header.querySelector('[data-js="nav-toggle"]');
  const nav = header.querySelector('[data-js="site-nav"]');
  const list = nav.querySelector('ul');
  const links = [...nav.querySelectorAll('a[href^="#"]')];
  const sectionIds = [...doc.querySelectorAll('main section[id]')].map((section) => section.id);
  const cleanups = [];

  const listen = (target, type, handler) => {
    target.addEventListener(type, handler);
    cleanups.push(() => target.removeEventListener(type, handler));
  };

  header.dataset.enhanced = 'true';
  toggle.hidden = false;

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  function setOpen(open, { restoreFocus = false } = {}) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.dataset.labelClose : toggle.dataset.labelOpen);
    header.classList.toggle('site-header--open', open);
    if (!open && restoreFocus) toggle.focus();
  }

  listen(toggle, 'click', () => setOpen(!isOpen()));

  listen(nav, 'click', (event) => {
    if (event.target.closest('a[href^="#"]') && isOpen()) setOpen(false);
  });

  listen(doc, 'keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) setOpen(false, { restoreFocus: true });
  });

  listen(doc, 'click', (event) => {
    if (!isOpen()) return;
    if (list.contains(event.target) || toggle.contains(event.target)) return;
    setOpen(false, { restoreFocus: true });
  });

  function updateActiveLink() {
    const sections = links
      .map((link) => doc.getElementById(link.hash.slice(1)))
      .filter(Boolean)
      .map((section) => ({
        id: section.id,
        top: section.getBoundingClientRect().top + win.scrollY,
      }));
    const offset = win.scrollY + header.offsetHeight + 1;
    const atBottom = win.innerHeight + win.scrollY >= doc.documentElement.scrollHeight - 2;
    const activeId = pickActiveSection(sections, offset, { atBottom });

    links.forEach((link) => {
      if (link.hash === `#${activeId}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  let frame = 0;
  listen(win, 'scroll', () => {
    if (frame) return;
    frame = win.requestAnimationFrame(() => {
      frame = 0;
      updateActiveLink();
    });
  });

  function redirectLegacyHash() {
    const { hash } = win.location;
    const resolved = resolveSectionHash(hash, sectionIds);
    if (!resolved || resolved === hash) return;
    win.history.replaceState(null, '', resolved);
    doc.getElementById(resolved.slice(1))?.scrollIntoView({ behavior: 'instant' });
  }

  listen(win, 'hashchange', redirectLegacyHash);
  redirectLegacyHash();
  updateActiveLink();

  return {
    destroy() {
      cleanups.forEach((cleanup) => cleanup());
      if (frame) win.cancelAnimationFrame(frame);
    },
  };
}
