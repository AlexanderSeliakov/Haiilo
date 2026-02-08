import type { CartItem } from '@/types';

const CENTS_PER_EURO = 100;

/**
 * Formats price from cents to euro string
 * @param cents - Price in cents
 * @returns Formatted price string (e.g., "€1.50")
 * @throws Error if cents is negative
 */
export function formatPrice(cents: number): string {
  if (cents < 0) {
    throw new Error('Price cannot be negative');
  }
  return `€${(cents / CENTS_PER_EURO).toFixed(2)}`;
}

/**
 * Calculates total price for all items in cart
 * @param cartItems - Array of cart items
 * @returns Total price in cents
 * @throws Error if cartItems is invalid or contains negative prices
 */
export function calculateTotal(cartItems: CartItem[]): number {
  if (!Array.isArray(cartItems)) {
    throw new Error('Cart items must be an array');
  }

  if (cartItems.length === 0) {
    return 0;
  }

  const total = cartItems.reduce((sum, item) => {
    if (!item || !item.product) {
      throw new Error('Invalid cart item: missing product');
    }

    if (typeof item.quantity !== 'number' || item.quantity < 0) {
      throw new Error(`Invalid quantity for product ${item.product.name}`);
    }

    if (typeof item.product.priceInCents !== 'number' || item.product.priceInCents < 0) {
      throw new Error(`Invalid price for product ${item.product.name}`);
    }

    return sum + item.product.priceInCents * item.quantity;
  }, 0);

  return total;
}
