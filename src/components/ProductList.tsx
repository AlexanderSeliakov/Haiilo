import { ProductItem } from './ProductItem';
import { offers } from '@/data/offers';
import { products } from '@/data/products';

export function ProductList() {
  return (
    <section className="products">
      <h2 className="products__title">Products</h2>
      <ul className="products__list">
        {products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            offer={offers.find((o) => o.productId === product.id)}
          />
        ))}
      </ul>
    </section>
  );
}
