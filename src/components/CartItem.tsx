import type { Product } from '@/types';
import { formatPrice } from '@/utils/formatPrice';

interface CartItemProps {
  product: Product;
  quantity: number;
}

export function CartItem({ product, quantity }: CartItemProps) {
  return (
    <li>
      <span>{product.name}</span>
      <span>x{quantity}</span>
      <span>{formatPrice(product.priceInCents * quantity)}</span>
    </li>
  );
}
