import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProductItem } from './ProductItem';
import { CartProvider } from '@/context/CartProvider';

describe('ProductItem', () => {

  it('should render products correctly', () => {
    const banana = {
      id: 'banana',
      name: 'Banana',
      priceInCents: 150,
    };

    render(
      <CartProvider>
        <ProductItem product={banana} />
      </CartProvider>
    );

    expect(screen.getByText('Banana')).toBeInTheDocument();
    expect(screen.getByText('€1.50')).toBeInTheDocument();
  });
});
