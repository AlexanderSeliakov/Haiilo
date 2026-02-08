import { createContext } from 'react';
import type { CartItem } from '@/types';
import type { CartAction } from '@/reducers/cartReducer';

/**
 * Context for cart state - uses undefined to enforce Provider usage
 * @internal - Use useCartState hook instead
 */
export const CartStateContext = createContext<CartItem[] | undefined>(
  undefined
);

/**
 * Context for cart dispatch - uses undefined to enforce Provider usage
 * @internal - Use useCartDispatch hook instead
 */
export const CartDispatchContext = createContext<
  React.Dispatch<CartAction> | undefined
>(undefined);
