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
