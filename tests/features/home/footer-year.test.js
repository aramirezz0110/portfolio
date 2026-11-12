import { describe, expect, it } from 'vitest';
import { initFooterYear } from '../../../src/features/home/components/footer-year.js';

describe('initFooterYear', () => {
  it('escribe el año de la fecha dada', () => {
    const element = document.createElement('span');
    element.textContent = '2026';

    initFooterYear(element, new Date('2031-03-15T12:00:00Z'));

    expect(element.textContent).toBe('2031');
  });
});
