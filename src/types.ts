export interface Product {
  id: string;
  name: string;
  priceInCents: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Offer {
  productId: string;
  quantity: number;
  priceInCents: number;
}
