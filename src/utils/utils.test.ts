import { describe, it, expect } from 'vitest';
import { formatPrice } from './utils';

describe('formatPrice', () => {
  it('should format zero correctly', () => {
    expect(formatPrice(0)).toBe('€0.00');
  });

  it('should format cents to euros', () => {
    expect(formatPrice(30)).toBe('€0.30');
    expect(formatPrice(99)).toBe('€0.99');
  });

  it('should format whole euros', () => {
    expect(formatPrice(100)).toBe('€1.00');
  });

  it('should format euros with cents', () => {
    expect(formatPrice(123)).toBe('€1.23');
    expect(formatPrice(1234)).toBe('€12.34');
  });

  it('should handle large amounts', () => {
    expect(formatPrice(999999)).toBe('€9999.99');
    expect(formatPrice(100000)).toBe('€1000.00');
  });

  it('should throw error for negative prices', () => {
    expect(() => formatPrice(-1)).toThrow('Price cannot be negative');
    expect(() => formatPrice(-100)).toThrow('Price cannot be negative');
  });

  it('should always show two decimal places', () => {
    expect(formatPrice(1)).toBe('€0.01');
    expect(formatPrice(10)).toBe('€0.10');
    expect(formatPrice(100)).toBe('€1.00');
  });
});
