import { initFooterYear } from './components/footer-year.js';
import { initProjectFilter } from './components/project-filter.js';
import { initSiteNav } from './components/site-nav.js';

const header = document.querySelector('[data-js="site-header"]');
if (header) initSiteNav(header);

const projects = document.querySelector('[data-js="projects"]');
if (projects) initProjectFilter(projects);

const year = document.querySelector('[data-js="footer-year"]');
if (year) initFooterYear(year);

// GLightbox se carga como script de vendor (assets/vendor/glightbox) antes de este módulo.
globalThis.GLightbox?.({ selector: '.portfolio-lightbox' });
