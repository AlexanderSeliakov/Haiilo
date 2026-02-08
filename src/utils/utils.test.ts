/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from 'vitest';
import { formatPrice, calculateTotal } from './utils';
import type { CartItem } from '@/types';

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

describe('calculateTotal', () => {
  const mockProducts = {
    apple: { id: 'apple', name: 'Apple', priceInCents: 30 },
    banana: { id: 'banana', name: 'Banana', priceInCents: 50 },
    orange: { id: 'orange', name: 'Orange', priceInCents: 60 },
    milk: { id: 'milk', name: 'Milk', priceInCents: 120 },
  };

  it('should return 0 for empty cart', () => {
    expect(calculateTotal([])).toBe(0);
  });

  it('should calculate total for single item with quantity 1', () => {
    const cart: CartItem[] = [{ product: mockProducts.apple, quantity: 1 }];
    expect(calculateTotal(cart)).toBe(30);
  });

  it('should calculate total for single item with multiple quantity', () => {
    const cart: CartItem[] = [{ product: mockProducts.apple, quantity: 3 }];
    expect(calculateTotal(cart)).toBe(90); // 30 * 3
  });

  it('should calculate total for complex cart', () => {
    const cart: CartItem[] = [
      { product: mockProducts.apple, quantity: 5 },
      { product: mockProducts.banana, quantity: 2 },
      { product: mockProducts.orange, quantity: 1 },
      { product: mockProducts.milk, quantity: 3 },
    ];
    // 5*30 + 2*50 + 1*60 + 3*120 = 150 + 100 + 60 + 360 = 670
    expect(calculateTotal(cart)).toBe(670);
  });

  it('should handle items with zero quantity', () => {
    const cart: CartItem[] = [{ product: mockProducts.apple, quantity: 0 }];
    expect(calculateTotal(cart)).toBe(0);
  });

  describe('validation (if enabled)', () => {
    it('should throw error for non-array input', () => {
      expect(() => calculateTotal(null as any)).toThrow(
        'Cart items must be an array'
      );
      expect(() => calculateTotal(undefined as any)).toThrow(
        'Cart items must be an array'
      );
      expect(() => calculateTotal({} as any)).toThrow(
        'Cart items must be an array'
      );
    });

    it('should throw error for invalid cart item structure', () => {
      const invalidCart = [{ product: null, quantity: 1 }] as any;
      expect(() => calculateTotal(invalidCart)).toThrow(
        'Invalid cart item: missing product'
      );
    });

    it('should throw error for negative quantity', () => {
      const cart: CartItem[] = [{ product: mockProducts.apple, quantity: -1 }];
      expect(() => calculateTotal(cart)).toThrow('Invalid quantity');
    });

    it('should throw error for invalid quantity type', () => {
      const cart = [
        { product: mockProducts.apple, quantity: 'invalid' },
      ] as any;
      expect(() => calculateTotal(cart)).toThrow('Invalid quantity');
    });

    it('should throw error for negative price', () => {
      const invalidProduct = { id: 'bad', name: 'Bad', priceInCents: -10 };
      const cart: CartItem[] = [{ product: invalidProduct, quantity: 1 }];
      expect(() => calculateTotal(cart)).toThrow('Invalid price');
    });

    it('should throw error for invalid price type', () => {
      const invalidProduct = {
        id: 'bad',
        name: 'Bad',
        priceInCents: 'free',
      } as any;
      const cart: CartItem[] = [{ product: invalidProduct, quantity: 1 }];
      expect(() => calculateTotal(cart)).toThrow('Invalid price');
    });
  });
});
