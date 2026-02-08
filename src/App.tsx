import { ProductList } from '@/components/ProductList';
import { Cart } from '@/components/Cart';
import { CartProvider } from '@/context/CartProvider';
import { products } from '@/data/products';

function App() {
  return (
    <CartProvider>
      <main>
        <h1>Supermarket Checkout</h1>
        <ProductList products={products} />
        <Cart />
      </main>
    </CartProvider>
  );
}

export default App;
