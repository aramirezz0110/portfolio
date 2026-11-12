import { describe, expect, it, vi } from 'vitest';
import {
  ALL_PROJECTS,
  createProjectFilterState,
  isProjectVisible,
  pickActiveSection,
  resolveSectionHash,
} from '../../../src/features/home/state.js';

const IDS = ['hero', 'about', 'experience', 'portfolio', 'contact'];

describe('resolveSectionHash', () => {
  it('devuelve el ancla si la sección existe', () => {
    expect(resolveSectionHash('#about', IDS)).toBe('#about');
  });

  it('traduce las anclas antiguas', () => {
    expect(resolveSectionHash('#resume', IDS)).toBe('#experience');
    expect(resolveSectionHash('#header', IDS)).toBe('#hero');
  });

  it('devuelve null para anclas vacías o desconocidas', () => {
    expect(resolveSectionHash('', IDS)).toBeNull();
    expect(resolveSectionHash('#', IDS)).toBeNull();
    expect(resolveSectionHash('#interests', IDS)).toBeNull();
  });
});

describe('pickActiveSection', () => {
  const sections = [
    { id: 'about', top: 800 },
    { id: 'experience', top: 1600 },
    { id: 'contact', top: 3000 },
  ];

  it('devuelve null antes de la primera sección', () => {
    expect(pickActiveSection(sections, 100)).toBeNull();
  });

  it('devuelve la última sección cuyo inicio ya pasó', () => {
    expect(pickActiveSection(sections, 800)).toBe('about');
    expect(pickActiveSection(sections, 2000)).toBe('experience');
  });

  it('no depende del orden de entrada', () => {
    expect(pickActiveSection([...sections].reverse(), 2000)).toBe('experience');
  });

  it('al final de la página activa la última sección', () => {
    expect(pickActiveSection(sections, 2500, { atBottom: true })).toBe('contact');
  });

  it('sin secciones devuelve null', () => {
    expect(pickActiveSection([], 500)).toBeNull();
  });
});

describe('isProjectVisible', () => {
  it('"all" muestra todo', () => {
    expect(isProjectVisible(['unity-3d'], ALL_PROJECTS)).toBe(true);
  });

  it('muestra solo los proyectos de la categoría', () => {
    expect(isProjectVisible(['unity-3d'], 'unity-3d')).toBe(true);
    expect(isProjectVisible(['unity-2d'], 'unity-3d')).toBe(false);
  });
});

describe('createProjectFilterState', () => {
  it('empieza en "all" y notifica los cambios', () => {
    const state = createProjectFilterState();
    const listener = vi.fn();
    state.subscribe(listener);

    expect(state.getFilter()).toBe(ALL_PROJECTS);
    state.setFilter('unity-xr');

    expect(state.getFilter()).toBe('unity-xr');
    expect(listener).toHaveBeenCalledWith('unity-xr');
  });

  it('no notifica si el filtro no cambia', () => {
    const state = createProjectFilterState();
    const listener = vi.fn();
    state.subscribe(listener);

    state.setFilter(ALL_PROJECTS);
    expect(listener).not.toHaveBeenCalled();
  });

  it('permite desuscribirse', () => {
    const state = createProjectFilterState();
    const listener = vi.fn();
    const unsubscribe = state.subscribe(listener);

    unsubscribe();
    state.setFilter('unity-2d');
    expect(listener).not.toHaveBeenCalled();
  });
});
