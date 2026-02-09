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
    <li className="product-item">
      <div className="product-item__info">
        <span className="product-item__name">{product.name}</span>
        <span className="product-item__price">
          {formatPrice(product.priceInCents)}
        </span>
      </div>
      {offer && (
        <span className="product-item__offer">
          {offer.quantity} for {formatPrice(offer.priceInCents)}
        </span>
      )}
      <button
        className="product-item__add-btn"
        type="button"
        onClick={handleAddToCart}
      >
        Add to cart
      </button>
    </li>
  );
}
