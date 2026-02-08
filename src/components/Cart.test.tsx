import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Cart } from './Cart';
import { CartProvider } from '@/context/CartProvider';


describe('Cart', () => {
  it('should show empty message when cart is empty', () => {
    render(
      <CartProvider>
        <Cart />
      </CartProvider>
    );

    expect(screen.getByText('Your cart is empty.')).toBeInTheDocument();
  });
});
