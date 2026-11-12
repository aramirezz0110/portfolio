/**
 * Lógica pura y estado del feature home (sin DOM). Ver docs/ai/state.md.
 */

/** Anclas antiguas que se siguen respetando para no romper links compartidos. */
export const LEGACY_HASH_ALIASES = Object.freeze({
  '#resume': '#experience',
  '#header': '#hero',
});

/**
 * Traduce un ancla (posiblemente antigua) al ancla de una sección existente.
 * @param {string} hash Por ejemplo '#resume'.
 * @param {string[]} knownIds Ids de las secciones de la página.
 * @returns {string | null} El ancla destino, o null si no corresponde a ninguna sección.
 */
export function resolveSectionHash(hash, knownIds) {
  if (!hash || hash === '#') return null;
  const target = LEGACY_HASH_ALIASES[hash] ?? hash;
  return knownIds.includes(target.slice(1)) ? target : null;
}

/**
 * Elige la sección activa según la posición de scroll.
 * @param {{ id: string, top: number }[]} sections Posición absoluta de cada sección.
 * @param {number} offset Posición de scroll más el alto de la barra fija.
 * @param {{ atBottom?: boolean }} [options] Si la página llegó al final, gana la última sección.
 * @returns {string | null}
 */
export function pickActiveSection(sections, offset, { atBottom = false } = {}) {
  if (sections.length === 0) return null;
  const sorted = [...sections].sort((a, b) => a.top - b.top);
  if (atBottom) return sorted[sorted.length - 1].id;
  let active = null;
  for (const section of sorted) {
    if (section.top > offset) break;
    active = section.id;
  }
  return active;
}

export const ALL_PROJECTS = 'all';

/**
 * @param {string[]} categories Categorías del proyecto.
 * @param {string} filter Filtro activo.
 */
export function isProjectVisible(categories, filter) {
  return filter === ALL_PROJECTS || categories.includes(filter);
}

/** Estado del filtro de proyectos: acciones + suscripción. */
export function createProjectFilterState(initial = ALL_PROJECTS) {
  let filter = initial;
  const listeners = new Set();

  return {
    getFilter: () => filter,
    setFilter(next) {
      if (next === filter) return;
      filter = next;
      listeners.forEach((listener) => listener(filter));
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
