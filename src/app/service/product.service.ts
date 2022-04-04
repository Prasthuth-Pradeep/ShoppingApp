
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IBrand, ICategory, IProduct, IProductDetails, IWishlist } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "http://localhost:3000";
  private refreshNeededSubject = new Subject<void>();
  
  constructor(private http: HttpClient) { }

  get refreshNotification() {
    return this.refreshNeededSubject;
  }

  getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(`${this.url}/brands`);
  }

  getCategory(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${this.url}/category`);
  }

  addWishlist(wishlistData: any): Observable<any[]>{
    return this.http.post<any[]>(`${this.url}/wishlist`, wishlistData).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

  removeWishlist(wishlistData: any): Observable<any>{
    return this.http.post<any>(`${this.url}/wishlist/remove-wishlist`, wishlistData).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

  getWishlist(wishlistData: any): Observable<IWishlist[]> {
    return this.http.post<IWishlist[]>(`${this.url}/wishlist/fetch-wishlist`, wishlistData);
  }

  updateProductQuantity(productQuantityData: any): Observable<any[]>{
    return this.http.put<any[]>(`${this.url}/products/update-quantity`, productQuantityData);
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
