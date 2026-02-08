import { describe, it, expect } from 'vitest';
import {
  calculateItemPrice,
  calculateTotalWithDiscounts,
  calculateSavings,
} from './discountService';
import type { CartItem, Offer } from '@/types';

describe('discountService', () => {
  const mockProducts = {
    apple: { id: 'apple', name: 'Apple', priceInCents: 30 },
    banana: { id: 'banana', name: 'Banana', priceInCents: 50 },
  };

  const mockOffers: Offer[] = [
    { productId: 'apple', quantity: 2, priceInCents: 45 },
    { productId: 'banana', quantity: 3, priceInCents: 130 },
  ];

  describe('calculateItemPrice', () => {
    it('should calculate regular price when no offer', () => {
      const item: CartItem = { product: mockProducts.apple, quantity: 3 };
      expect(calculateItemPrice(item, undefined)).toBe(90); // 3 * 30
    });

    it('should calculate regular price when quantity below offer threshold', () => {
      const item: CartItem = { product: mockProducts.apple, quantity: 1 };
      const offer = mockOffers[0];
      expect(calculateItemPrice(item, offer)).toBe(30); // 1 * 30
    });

    it('should apply discount for exact quantity match', () => {
      const item: CartItem = { product: mockProducts.apple, quantity: 2 };
      const offer = mockOffers[0];
      expect(calculateItemPrice(item, offer)).toBe(45); // offer price
    });

    it('should apply discount and add remaining items at regular price', () => {
      const item: CartItem = { product: mockProducts.apple, quantity: 5 };
      const offer = mockOffers[0];
      expect(calculateItemPrice(item, offer)).toBe(120);
    });

    it('should handle multiple discount sets', () => {
      const item: CartItem = { product: mockProducts.banana, quantity: 7 };
      const offer = mockOffers[1];
      expect(calculateItemPrice(item, offer)).toBe(310);
    });
  });

  describe('calculateTotalWithDiscounts', () => {
    it('should return 0 for empty cart', () => {
      expect(calculateTotalWithDiscounts([], mockOffers)).toBe(0);
    });

    it('should calculate total with no discounts applied', () => {
      const cartItems: CartItem[] = [
        { product: mockProducts.apple, quantity: 1 },
      ];
      expect(calculateTotalWithDiscounts(cartItems, mockOffers)).toBe(30);
    });

    it('should calculate total with discount applied', () => {
      const cartItems: CartItem[] = [
        { product: mockProducts.apple, quantity: 2 },
      ];
      expect(calculateTotalWithDiscounts(cartItems, mockOffers)).toBe(45);
    });

    it('should calculate total with multiple products and mixed discounts', () => {
      const cartItems: CartItem[] = [
        { product: mockProducts.apple, quantity: 4 },
        { product: mockProducts.banana, quantity: 5 },
      ];
      // apples: 2*45 + 0*30 = 90, bananas: 1*130 + 2*50 = 230 → 320
      expect(calculateTotalWithDiscounts(cartItems, mockOffers)).toBe(320);
    });

    it('should calculate total for product without an offer', () => {
      const orange = { id: 'orange', name: 'Orange', priceInCents: 60 };
      const cartItems: CartItem[] = [{ product: orange, quantity: 3 }];
      expect(calculateTotalWithDiscounts(cartItems, mockOffers)).toBe(180);
    });
  });

  describe('calculateSavings', () => {
    it('should return 0 when no discounts applied', () => {
      const cartItems: CartItem[] = [
        { product: mockProducts.apple, quantity: 1 },
      ];
      expect(calculateSavings(cartItems, mockOffers)).toBe(0);
    });

    it('should calculate savings correctly', () => {
      const cartItems: CartItem[] = [
        { product: mockProducts.apple, quantity: 2 },
      ];
      // regular: 2*30=60, discounted: 45, savings: 15
      expect(calculateSavings(cartItems, mockOffers)).toBe(15);
    });

    it('should calculate savings with multiple discounted products', () => {
      const cartItems: CartItem[] = [
        { product: mockProducts.apple, quantity: 4 },
        { product: mockProducts.banana, quantity: 3 },
      ];
      // apples regular: 4*30=120, discounted: 2*45=90, save 30
      // bananas regular: 3*50=150, discounted: 130, save 20
      expect(calculateSavings(cartItems, mockOffers)).toBe(50);
    });
  });
});
