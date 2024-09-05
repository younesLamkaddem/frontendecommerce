import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json'
});

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private apiUrl = 'http://localhost:5243/api/Products';  

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    // Define the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Pass headers in the request options
    return this.http.get<Product[]>(this.apiUrl, { headers });
  }
  //getProducts(): Observable<Product[]> {
    //return this.http.get<Product[]>(this.apiUrl);
    //return this.http.get<Product[]>(this.apiUrl, { headers });

  //}

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: Product): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
