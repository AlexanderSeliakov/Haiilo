import { useCartState } from '@/hooks/useCart';
import { formatPrice } from '@/utils/utils';
import { CartItem } from './CartItem';
import { offers } from '@/data/offers';
import {
  calculateTotalWithDiscounts,
  calculateSavings,
} from '@/services/discountService';

export function Cart() {
  const cartItems = useCartState();

  if (cartItems.length === 0) {
    return (
      <aside>
        <h2>Cart</h2>
        <p>Your cart is empty.</p>
      </aside>
    );
  }

  const totalInCents = calculateTotalWithDiscounts(cartItems, offers);
  const savings = calculateSavings(cartItems, offers);

  return (
    <aside>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => {
          const offer = offers.find((o) => o.productId === item.product.id);
          return (
            <CartItem
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
              offer={offer}
            />
          );
        })}
      </ul>

      {savings > 0 && <p>You save: {formatPrice(savings)}</p>}

      <p>
        <strong>Total: {formatPrice(totalInCents)}</strong>
      </p>
    </aside>
  );
}
