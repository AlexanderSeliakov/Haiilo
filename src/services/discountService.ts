import type { CartItem, Offer } from '@/types';

export function calculateItemPrice(item: CartItem, offer?: Offer): number {
  if (!offer || item.quantity < offer.quantity) {
    return item.product.priceInCents * item.quantity;
  }

  const discountedSets = Math.floor(item.quantity / offer.quantity);
  const remainingItems = item.quantity % offer.quantity;

  return (
    discountedSets * offer.priceInCents +
    remainingItems * item.product.priceInCents
  );
}

export function calculateTotalWithDiscounts(
  cartItems: CartItem[],
  offers: Offer[]
): number {
  return cartItems.reduce((total, item) => {
    const offer = offers.find((o) => o.productId === item.product.id);
    return total + calculateItemPrice(item, offer);
  }, 0);
}

export function calculateSavings(
  cartItems: CartItem[],
  offers: Offer[]
): number {
  const totalWithoutDiscount = cartItems.reduce(
    (sum, item) => sum + item.product.priceInCents * item.quantity,
    0
  );

  const totalWithDiscount = calculateTotalWithDiscounts(cartItems, offers);

  return totalWithoutDiscount - totalWithDiscount;
}
