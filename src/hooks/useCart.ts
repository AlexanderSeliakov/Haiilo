import { useContext } from 'react';
import { CartStateContext, CartDispatchContext } from '@/context/CartContexts';

/**
 * Hook to access cart state
 * @throws Error if used outside CartProvider
 */
export function useCartState() {
  const context = useContext(CartStateContext);
  if (context === undefined) {
    throw new Error('useCartState must be used within CartProvider');
  }
  return context;
}

/**
 * Hook to access cart dispatch function
 * @throws Error if used outside CartProvider
 */
export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (context === undefined) {
    throw new Error('useCartDispatch must be used within CartProvider');
  }
  return context;
}
