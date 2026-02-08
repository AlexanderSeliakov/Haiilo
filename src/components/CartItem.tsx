import type { Product, Offer } from '@/types';
import { formatPrice } from '@/utils/utils';
import { useCartDispatch } from '@/hooks/useCart';
import { calculateItemPrice } from '@/services/discountService';

interface CartItemProps {
  product: Product;
  quantity: number;
  offer?: Offer;
}

export function CartItem({ product, quantity, offer }: CartItemProps) {
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

  const linePrice = calculateItemPrice({ product, quantity }, offer);

  return (
    <li>
      <span>{product.name}</span>
      <span>x{quantity}</span>
      <span>{formatPrice(linePrice)}</span>
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
