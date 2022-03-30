import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IBrand, ICategory, IProduct, IProductDetails } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getProductById(id: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/products/${id}`);
  }

  getLaptops(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.url}/product/laptops`);
  }

  getLaptopById(id: number): Observable<IProductDetails[]> {
    return this.http.get<IProductDetails[]>(`${this.url}/product/laptops/${id}`)
  }
}
