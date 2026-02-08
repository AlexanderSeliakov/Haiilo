import { describe, it, expect } from 'vitest';
import { cartReducer } from './cartReducer';
import type { CartItem, Product } from '@/types';

describe('cartReducer', () => {
  const mockProducts: Record<string, Product> = {
    apple: { id: 'apple', name: 'Apple', priceInCents: 30 },
    banana: { id: 'banana', name: 'Banana', priceInCents: 50 },
    orange: { id: 'orange', name: 'Orange', priceInCents: 60 },
  };

  describe('ADD action', () => {
    it('should add new product to empty cart', () => {
      const result = cartReducer([], {
        type: 'ADD',
        product: mockProducts.apple,
      });

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        product: mockProducts.apple,
        quantity: 1,
      });
    });

    it('should increase quantity if product already exists', () => {
      const initialState: CartItem[] = [
        { product: mockProducts.apple, quantity: 1 },
      ];

      const result = cartReducer(initialState, {
        type: 'ADD',
        product: mockProducts.apple,
      });

      expect(result).toHaveLength(1);
      expect(result[0].quantity).toBe(2);
    });

    it('should add second product to cart with existing items', () => {
      const initialState: CartItem[] = [
        { product: mockProducts.apple, quantity: 2 },
      ];

      const result = cartReducer(initialState, {
        type: 'ADD',
        product: mockProducts.banana,
      });

      expect(result).toHaveLength(2);
      expect(result[0].product.id).toBe('apple');
      expect(result[1].product.id).toBe('banana');
      expect(result[1].quantity).toBe(1);
    });
  });

  describe('INCREASE action', () => {
    it('should increase quantity of existing product', () => {
      const initialState: CartItem[] = [
        { product: mockProducts.apple, quantity: 1 },
      ];

      const result = cartReducer(initialState, {
        type: 'INCREASE',
        productId: 'apple',
      });

      expect(result[0].quantity).toBe(2);
    });
  });

  describe('DECREASE action', () => {
    it('should decrease quantity of existing product', () => {
      const initialState: CartItem[] = [
        { product: mockProducts.apple, quantity: 2 },
      ];

      const result = cartReducer(initialState, {
        type: 'DECREASE',
        productId: 'apple',
      });

      expect(result).toHaveLength(1);
      expect(result[0].quantity).toBe(1);
    });
  });

  describe('REMOVE action', () => {
    it('should remove product from cart', () => {
      const initialState: CartItem[] = [
        { product: mockProducts.apple, quantity: 5 },
      ];

      const result = cartReducer(initialState, {
        type: 'REMOVE',
        productId: 'apple',
      });

      expect(result).toHaveLength(0);
    });
  });

  describe('Non-existent productId', () => {
    it('should not change state when INCREASE targets non-existent product', () => {
      const initialState: CartItem[] = [
        { product: mockProducts.apple, quantity: 1 },
      ];

      const result = cartReducer(initialState, {
        type: 'INCREASE',
        productId: 'nonexistent',
      });

      expect(result).toHaveLength(1);
      expect(result[0].quantity).toBe(1);
    });

    it('should not change state when DECREASE targets non-existent product', () => {
      const initialState: CartItem[] = [
        { product: mockProducts.apple, quantity: 2 },
      ];

      const result = cartReducer(initialState, {
        type: 'DECREASE',
        productId: 'nonexistent',
      });

      expect(result).toHaveLength(1);
      expect(result[0].quantity).toBe(2);
    });

    it('should not change state when REMOVE targets non-existent product', () => {
      const initialState: CartItem[] = [
        { product: mockProducts.apple, quantity: 1 },
      ];

      const result = cartReducer(initialState, {
        type: 'REMOVE',
        productId: 'nonexistent',
      });

      expect(result).toHaveLength(1);
    });
  });

  describe('Edge cases with invalid quantities', () => {
    it('should remove product with quantity 0 when using REMOVE action', () => {
      const initialState: CartItem[] = [
        { product: mockProducts.apple, quantity: 0 },
      ];

      const result = cartReducer(initialState, {
        type: 'REMOVE',
        productId: 'apple',
      });

      expect(result).toHaveLength(0);
    });

    it('should filter out product with negative quantity when using DECREASE action', () => {
      const initialState: CartItem[] = [
        { product: mockProducts.apple, quantity: -5 },
      ];

      const result = cartReducer(initialState, {
        type: 'DECREASE',
        productId: 'apple',
      });

      // DECREASE filters items where quantity > 0, so negative should be removed
      expect(result).toHaveLength(0);
    });

    it('should handle INCREASE on product with quantity 0', () => {
      const initialState: CartItem[] = [
        { product: mockProducts.apple, quantity: 0 },
      ];

      const result = cartReducer(initialState, {
        type: 'INCREASE',
        productId: 'apple',
      });

      expect(result[0].quantity).toBe(1);
    });

    it('should add product with zero price', () => {
      const freeProduct = { id: 'free', name: 'Free Sample', priceInCents: 0 };

      const result = cartReducer([], {
        type: 'ADD',
        product: freeProduct,
      });

      expect(result).toHaveLength(1);
      expect(result[0].product.priceInCents).toBe(0);
      expect(result[0].quantity).toBe(1);
    });
  });

  describe('Integration scenarios', () => {
    it('should handle ADD same product multiple times consecutively', () => {
      let state: CartItem[] = [];

      state = cartReducer(state, { type: 'ADD', product: mockProducts.apple });
      state = cartReducer(state, { type: 'ADD', product: mockProducts.apple });
      state = cartReducer(state, { type: 'ADD', product: mockProducts.apple });

      expect(state).toHaveLength(1);
      expect(state[0].quantity).toBe(3);
    });

    it('should handle full user flow: ADD → INCREASE → DECREASE → REMOVE', () => {
      let state: CartItem[] = [];

      // 1. Add product
      state = cartReducer(state, { type: 'ADD', product: mockProducts.apple });
      expect(state[0].quantity).toBe(1);

      // 2. Increase to 3
      state = cartReducer(state, { type: 'INCREASE', productId: 'apple' });
      state = cartReducer(state, { type: 'INCREASE', productId: 'apple' });
      expect(state[0].quantity).toBe(3);

      // 3. Decrease to 1
      state = cartReducer(state, { type: 'DECREASE', productId: 'apple' });
      state = cartReducer(state, { type: 'DECREASE', productId: 'apple' });
      expect(state[0].quantity).toBe(1);

      // 4. Remove completely
      state = cartReducer(state, { type: 'REMOVE', productId: 'apple' });
      expect(state).toHaveLength(0);
    });

    it('should auto-remove when DECREASE brings quantity to 0', () => {
      let state: CartItem[] = [{ product: mockProducts.apple, quantity: 1 }];

      state = cartReducer(state, { type: 'DECREASE', productId: 'apple' });

      // Product should be automatically removed when quantity reaches 0
      expect(state).toHaveLength(0);
    });
  });
});
