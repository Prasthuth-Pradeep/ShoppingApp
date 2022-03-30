import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IOrderTotal } from '../models/product';
import { ICart, IOrder } from '../models/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

  private url = "http://localhost:3000";
  private refreshNeededSubject = new Subject<any>();
  private isClickCancelOrderPopoverClose:Subject<any> = new Subject();
  private isClickRemoveCart:Subject<any> = new Subject();
  private isProductIdToOrder = new BehaviorSubject<number>(0);
  private isProductIdToCancelOrder = new BehaviorSubject<number>(0);
  private isCartIdToRemove = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) { }

  get refreshNotification() {
    return this.refreshNeededSubject;
  }

  
  public sendProductId(productId: number) {
    this.isProductIdToOrder.next(productId);
  }
  get productId(): Observable<number> {
    return this.isProductIdToOrder.asObservable();
  }

  public sendOrderId(orderId: number) {
    this.isProductIdToCancelOrder.next(orderId);
  }
  get orderId(): Observable<number> {
    return this.isProductIdToCancelOrder.asObservable();
  }

  public sendCartId(cartId: number) {
    this.isCartIdToRemove.next(cartId);
  }
  get cartId(): Observable<number> {
    return this.isCartIdToRemove.asObservable();
  }

  get isCancelOrderPopoverClose():Observable<any>{
    return this.isClickCancelOrderPopoverClose.asObservable();
  }
  public clickCancelOrderPopoverClose(){
    this.isClickCancelOrderPopoverClose.next();
  }

  sendOrderDetails(orderData: any) {
    return this.http.post<any[]>(`${this.url}/order`, orderData)
  }

  getOrderList(userId: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.url}/order/${userId}`)
  }

  getOrderTotal(quantity: number, productId: number): Observable<IOrderTotal[]> {
    const amountData: any = {
      quentity: quantity,
      productId: productId
    }
    return this.http.post<any[]>(`${this.url}/order/total`, amountData)
  }

  getOrderDetailsByOrderId(id: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.url}/order/details/${id}`)
  }

  putCancelOrderReq(orderId: number) {
    const orderCancelData: any = {
      orderId: orderId
    }
    return this.http.put(`${this.url}/order/cancel/cancel-req`, orderCancelData).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

  getCancelledOrders(id: number): Observable<IOrder[]> {
    return this.http.get<IOrder[]>(`${this.url}/order/cancel/${id}`)
  }

  getCart(userId: number): Observable<ICart[]> {
    return this.http.get<ICart[]>(`${this.url}/cart/${userId}`)
  }

  addToCart(cartData: ICart) {
    return this.http.post(`${this.url}/cart`, cartData).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

  getCartTotal(id: number): Observable<number> {
    return this.http.get<number>(`${this.url}/cart/total/${id}`)
  }

  removeCartItem(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/cart/${id}`).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

}
