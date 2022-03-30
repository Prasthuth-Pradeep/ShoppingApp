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
  private isCategoryId = new BehaviorSubject<number>(0);
  
  constructor(private http: HttpClient) { }

  public sendCategoryId(CategoryId: number) {
    this.isCategoryId.next(CategoryId);
  }
  get categoryId(): Observable<number> {
    return this.isCategoryId.asObservable();
  }

  getCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.url}/category`);
  }

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
