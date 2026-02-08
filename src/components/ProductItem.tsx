import type { Product } from '@/types';
import { formatPrice } from '@/utils/formatPrice';

interface ProductItemProps {
  product: Product;
}

export function ProductItem({ product }: ProductItemProps) {
  return (
    <li>
      <span>{product.name}</span>
      <span>{formatPrice(product.priceInCents)}</span>
      <button>Add to cart</button>
    </li>
  );
}
