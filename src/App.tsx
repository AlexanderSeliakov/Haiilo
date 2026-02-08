import { ProductList } from '@/components/ProductList';
import { Cart } from '@/components/Cart';
import { products } from '@/data/products';

function App() {
  return (
    <main>
      <h1>Supermarket Checkout</h1>
      <ProductList products={products} />
      <Cart />
    </main>
  );
}

export default App;
