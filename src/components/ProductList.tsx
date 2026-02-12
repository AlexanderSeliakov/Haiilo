import { ProductItem } from './ProductItem';
import { offers } from '@/data/offers';
import { products } from '@/data/products';
import { useCartState } from '@/hooks/useCart';

export function ProductList() {

  const state = useCartState()

  return (
    <section className="products">
      <h2 className="products__title">Products</h2>
      <ul className="products__list">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            quanitity = {state.find((item)=>item.product.id == product.id)?.quantity || 0}
            offer={offers.find((o) => o.productId === product.id)}
          />
        ))}
      </ul>
    </section>
  );
}
