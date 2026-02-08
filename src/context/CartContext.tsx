import { createContext, useContext, useReducer } from 'react';
import type { CartItem } from '@/types';
import { cartReducer, type CartAction } from '@/reducers/cartReducer';

const CartStateContext = createContext<CartItem[]>([]);
const CartDispatchContext = createContext<React.Dispatch<CartAction>>(() => {});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  return (
    <CartStateContext.Provider value={cartItems}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCartState() {
  return useContext(CartStateContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}
