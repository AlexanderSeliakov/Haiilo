
import { ProductItem } from './ProductItem';
import { offers } from '@/data/offers';
import { products } from '@/data/products';


export function ProductList() {
  return (
    <section>
      <h2>Products</h2>
      <ul>
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
