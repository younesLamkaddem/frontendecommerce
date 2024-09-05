import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { Order } from '../models/Order';
import { Cart, CartItem } from '../models/cart';
import { map , tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  private baseUrl = 'http://localhost:5243/api/orders';
  private cartUrl = 'http://localhost:5243/api/cart';
  private ordersSubject = new Subject<Order[]>();

  constructor(private http: HttpClient) { }
  listOfItems: CartItem[] = []; // Add this property

  getOrders(): Observable<Order[]> {
    // Define the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Pass headers in the request options
    return this.http.get<Order[]>(this.baseUrl, { headers });
  }


  getOrderItems(): Observable<CartItem[]> {
    // Define headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Define options
    const options = {
      headers: headers
    };

    return this.http.get<{ items: CartItem[] }>(this.cartUrl, options).pipe(
      map(response =>{
        this.listOfItems = response.items; // Assign the items to listOfItems
        return this.listOfItems;
      }),  // Extract the 'items' array from the response
      tap(items => {
        console.log('Extracted Items:', items);  // Logs the extracted items array
      })
    );
  }

  passOrder(order: any,username:any): void {
    // Define headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Define options
    const options = {
      headers: headers
    };


      const orderData = {
        id: order.value.id,
        customerName: username,
        shippingAddress: order.value.shippingAddress,
        totalAmount:1.1,
        orderDate: new Date().toISOString(),
        items: this.listOfItems
      };
      
    
      
      // Make POST request to submit the orde
       this.http.post(this.baseUrl, orderData,options).subscribe(response =>{
        console.log('response',response)
       });

    
  }


  getOrdersByUsername(username: any): Observable<Order[]> {
    const url = `${this.baseUrl}/by-username/${username}`;
    return this.http.get<Order[]>(url);
  }
  get orders$(): Observable<Order[]> {
    return this.ordersSubject.asObservable();
  }

}

