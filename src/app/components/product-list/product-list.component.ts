import { Component, OnInit , Injectable } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart-service.service';

import { Product } from '../../models/product';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{
  products: Product[] = [];

  constructor(private productService: ProductService , private cartService : CartService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }
  addItemToCart(product : Product): void {
    const item = {
      productId: product.id,
      quantity: 1,
      price: product.price
    };
    this.cartService.addItem(item);
  }
}
