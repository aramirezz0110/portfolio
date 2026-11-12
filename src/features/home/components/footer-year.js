/**
 * Escribe el año actual. El HTML trae un año fijo como respaldo sin JS.
 * @param {HTMLElement} element Elemento [data-js="footer-year"].
 * @param {Date} [now]
 */
export function initFooterYear(element, now = new Date()) {
  element.textContent = String(now.getFullYear());
}
