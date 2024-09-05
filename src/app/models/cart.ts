export interface CartItem {
    productId: number;
    quantity: number;
    price: number;
}

export interface Cart {
    id: number;
    totalPrice: number;
    items: CartItem[];
}
