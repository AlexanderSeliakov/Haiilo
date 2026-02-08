import { ProductList } from '@/components/ProductList';
import { Cart } from '@/components/Cart';
import { CartProvider } from '@/context/CartProvider';

function App() {
  return (
    <CartProvider>
      <main>
        <h1>Supermarket Checkout</h1>
        <ProductList />
        <Cart />
      </main>
    </CartProvider>
  );
}

export default App;
