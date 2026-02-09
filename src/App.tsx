import { ProductList } from '@/components/ProductList';
import { Cart } from '@/components/Cart';
import { CartProvider } from '@/context/CartProvider';

function App() {
  return (
    <CartProvider>
      <main className="app">
        <h1 className="app__title">Supermarket Checkout</h1>
        <div className="app__content">
          <ProductList />
          <Cart />
        </div>
      </main>
    </CartProvider>
  );
}

export default App;
