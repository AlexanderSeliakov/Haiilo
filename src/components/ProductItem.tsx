import type { Product } from '@/types';
import { formatPrice } from '@/utils/utils';
import { useCartDispatch } from '@/context/CartContext';

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  const dispatch = useCartDispatch();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD', product });
  };

  return (
    <li>
      <span>{product.name}</span>
      <span>{formatPrice(product.priceInCents)}</span>
      <button type="button" onClick={handleAddToCart}>Add to cart</button>
    </li>
  );
}
