import { useReducer } from 'react';
import { CartStateContext, CartDispatchContext } from './CartContexts';
import { cartReducer } from '@/reducers/cartReducer';

/**
 * Provider component for shopping cart context
 * Manages cart state using reducer pattern
 */
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
