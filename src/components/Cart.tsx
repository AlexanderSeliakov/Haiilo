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
      <aside className="cart">
        <h2 className="cart__title">Cart</h2>
        <p className="cart__empty">Your cart is empty.</p>
      </aside>
    );
  }

  const totalInCents = calculateTotalWithDiscounts(cartItems, offers);
  const savings = calculateSavings(cartItems, offers);

  return (
    <aside className="cart">
      <h2 className="cart__title">Cart</h2>
      <ul className="cart__list">
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

      <div className="cart__summary">
        {savings > 0 && (
          <p className="cart__savings">You save: {formatPrice(savings)}</p>
        )}
        <p className="cart__total">
          <strong>Total: {formatPrice(totalInCents)}</strong>
        </p>
      </div>
    </aside>
  );
}
