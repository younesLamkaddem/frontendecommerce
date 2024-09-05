import { Component, OnInit , Input } from '@angular/core';
import { CartService } from '../../services/cart-service.service';
import { Cart } from '../../models/cart';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
 // cart: Cart;
 cart: Cart = { id :0, items: [], totalPrice: 0 };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(cart => this.cart = cart);
    
  }
  showOrderComponent = false; 
  @Input() username: string | null = null;


  addItemToCart(): void {
    const item = {
      productId: 1,
      quantity: 2,
      price: 499.99
    };
    this.cartService.addItem(item);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
  orderNow() {
    this.showOrderComponent = true; 
  }
}
