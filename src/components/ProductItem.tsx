import type { Product, Offer } from '@/types';
import { formatPrice } from '@/utils/utils';
import { useCartDispatch,  } from '@/hooks/useCart';

interface ProductItemProps {
  product: Product;
  quanitity: number
  offer?: Offer;
}

export function ProductItem({ product, offer, quanitity }: ProductItemProps) {
  const dispatch = useCartDispatch();


  const disabled = quanitity >= 10

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
        className={`product-item__add-btn ${disabled ? 'disabled' : ''}`}
        type="button"
        onClick={handleAddToCart}
        disabled={disabled}
      >
        Add to cart
      </button>
    </li>
  );
}
