import { describe, expect, it } from 'vitest';
import { escapeHtml } from '../../../src/shared/utils/escape-html.js';

describe('escapeHtml', () => {
  it('escapa los caracteres especiales de HTML', () => {
    expect(escapeHtml(`<img src=x onerror="alert('x')">&`)).toBe(
      '&lt;img src=x onerror=&quot;alert(&#39;x&#39;)&quot;&gt;&amp;',
    );
  });

  it('devuelve texto plano sin cambios', () => {
    expect(escapeHtml('Flutter & Unity')).toBe('Flutter &amp; Unity');
    expect(escapeHtml('Hola mundo')).toBe('Hola mundo');
  });

  it('convierte null y undefined en cadena vacía', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
  });

  it('convierte otros tipos a string', () => {
    expect(escapeHtml(42)).toBe('42');
  });

  it('el resultado es inerte al parsearlo como HTML', () => {
    const doc = new DOMParser().parseFromString(
      `<p>${escapeHtml('<script>x</script>')}</p>`,
      'text/html',
    );
    expect(doc.querySelector('script')).toBeNull();
    expect(doc.body.textContent).toBe('<script>x</script>');
  });
});
