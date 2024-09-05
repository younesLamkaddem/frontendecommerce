import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:5243/api/cart';
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject<Cart>({ id: 0, totalPrice: 0, items: [] });
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private loadCart(): void {
    this.http.get<Cart>(`${this.baseUrl}`).subscribe(cart => this.cartSubject.next(cart));
  }
/*
  addItem(item: CartItem): void {
    this.http.post<void>(`${this.baseUrl}/AddItem`, item).subscribe(() => this.loadCart());
  }
*/
addItem(item: CartItem): void {
  // Define headers
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'mode':'cors'
  });

  // Define options
  const options = {
    headers: headers
  };
  console.log("abc");
  console.log(item);
  console.log(options);

  // Make POST request with headers and body
 // this.http.post<void>(`${this.baseUrl}/AddItem`, item, options)
   // .subscribe(() => this.loadCart());
   this.http.post<void>(`${this.baseUrl}/AddItem`, item, options)
   .subscribe({
     next: () => this.loadCart(),
     error: (err) => console.error('Error occurred:', err)
   });   
}
  clearCart(): void {
    this.http.post<void>(`${this.baseUrl}/Clear`, {}).subscribe(() => this.loadCart());
  }
}
