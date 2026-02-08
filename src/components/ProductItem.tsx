import type { Product, Offer } from '@/types';
import { formatPrice } from '@/utils/utils';
import { useCartDispatch } from '@/hooks/useCart';

interface ProductItemProps {
  product: Product;
  offer?: Offer;
}

export function ProductItem({ product, offer }: ProductItemProps) {
  const dispatch = useCartDispatch();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD', product });
  };

  return (
    <li>
      <span>{product.name}</span>
      <span>{formatPrice(product.priceInCents)}</span>
      {offer && (
        <span>
          {offer.quantity} for {formatPrice(offer.priceInCents)}
        </span>
      )}
      <button type="button" onClick={handleAddToCart}>Add to cart</button>
    </li>
  );
}
