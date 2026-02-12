import type { CartItem, Product } from '@/types';

export type CartAction =
  | { type: 'ADD'; product: Product }
  | { type: 'INCREASE'; productId: string }
  | { type: 'DECREASE'; productId: string }
  | { type: 'REMOVE'; productId: string };

export function cartReducer(state: CartItem[], action: CartAction): CartItem[] {
  switch (action.type) {
    case 'ADD': {
      const existing = state.find(
        (item) => item.product.id === action.product.id
      );
      if (existing) {
        return state.map((item) =>
          item.product.id === action.product.id && item.quantity < 10
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { product: action.product, quantity: 1 }];
    }
    case 'INCREASE':
      return state.map((item) =>
        item.product.id === action.productId  && item.quantity < 10
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case 'DECREASE':
      return state
        .map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);
    case 'REMOVE':
      return state.filter((item) => item.product.id !== action.productId);
  }
}
