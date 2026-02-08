import { useCartState } from '@/context/CartContext';
import { formatPrice, calculateTotal } from '@/utils/utils';
import { CartItem } from './CartItem';

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

  const totalInCents = calculateTotal(cartItems);

  return (
    <aside>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.product.id}
            product={item.product}
            quantity={item.quantity}
          />
        ))}
      </ul>
      <p>
        <strong>Total: {formatPrice(totalInCents)}</strong>
      </p>
    </aside>
  );
}
