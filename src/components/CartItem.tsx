import type { Product } from '@/types';
import { formatPrice } from '@/utils/utils';
import { useCartDispatch } from '@/context/CartContext';

interface CartItemProps {
  product: Product;
  quantity: number;
}

export function CartItem({ product, quantity }: CartItemProps) {
  const dispatch = useCartDispatch();

  const handleDecrease = () => {
    dispatch({ type: 'DECREASE', productId: product.id });
  };

  const handleIncrease = () => {
    dispatch({ type: 'INCREASE', productId: product.id });
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE', productId: product.id });
  };

  return (
    <li>
      <span>{product.name}</span>
      <span>x{quantity}</span>
      <span>{formatPrice(product.priceInCents * quantity)}</span>
      <button type="button" onClick={handleDecrease}>
        -
      </button>
      <button type="button" onClick={handleIncrease}>
        +
      </button>
      <button type="button" onClick={handleRemove}>
        Remove
      </button>
    </li>
  );
}
