import { memo } from 'react';
import type { Product, Offer } from '@/types';
import { formatPrice } from '@/utils/utils';
import { useCartDispatch } from '@/hooks/useCart';
import { calculateItemPrice } from '@/services/discountService';

interface CartItemProps {
  product: Product;
  quantity: number;
  offer?: Offer;
}

export const CartItem = memo(function CartItem({
  product,
  quantity,
  offer,
}: CartItemProps) {
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
    <li className="cart-item">
      <div className="cart-item__details">
        <span className="cart-item__name">{product.name}</span>
        <span className="cart-item__price">{formatPrice(linePrice)}</span>
      </div>
      <div className="cart-item__actions">
        <div className="cart-item__quantity">
          <button
            className="cart-item__qty-btn"
            type="button"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="cart-item__qty-value">{quantity}</span>
          <button
            className="cart-item__qty-btn"
            type="button"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
        <button
          className="cart-item__remove-btn"
          type="button"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </li>
  );
});
