import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private isBackHome: Subject<any> = new Subject();
  private isClickLaptop: Subject<any> = new Subject();
  private isClickCart: Subject<any> = new Subject();
  private isClickOrder: Subject<any> = new Subject();
  private isClickUserProfile: Subject<any> = new Subject();
  private isClickAddress: Subject<any> = new Subject();
  private isClickAddAddress:Subject<any> = new Subject();
  private isClickAddressPopoverClose:Subject<any> = new Subject();
  private isClickOrderDetails:Subject<any> = new Subject();
  
  private isHomeNavSubject = new BehaviorSubject<string>('');
  private isCartNavSubject = new BehaviorSubject<string>('');
  private isOrderClassNameSubject = new BehaviorSubject<string>('');
  
  constructor() { }

  get receiveOrderClassName():Observable<string>{
    return this.isOrderClassNameSubject.asObservable();
  }
  public sendOrderClassName(className: string){
    this.isOrderClassNameSubject.next(className)
  }
  // Cart nav class
  get receiveCartClassName():Observable<string>{
    return this.isCartNavSubject.asObservable();
  }
  public sendCartClassName(className:string){
    this.isCartNavSubject.next(className)
  }
  //  Home nav class
  get receiveHomeClassName():Observable<string>{
    return this.isHomeNavSubject.asObservable();
  }
  public sendHomeClassName(className:string){
    this.isHomeNavSubject.next(className)
  }

  // Navbar click event
  get isUserProfile():Observable<any>{
    return this.isClickUserProfile.asObservable();
  }
  public clickUserProfile(){
    this.isClickUserProfile.next();
  }

  get isOrderDetails():Observable<any>{
    return this.isClickOrderDetails.asObservable();
  }
  public clickOrderDetails(){
    this.isClickOrderDetails.next();
  }


  // user dashboard click events
  get isAddress():Observable<any>{
    return this.isClickAddress.asObservable();
  }
  public clickAddress(){
    this.isClickAddress.next();
  }

  get isAddAddress():Observable<any>{
    return this.isClickAddAddress.asObservable();
  }
  public clickAddAddress(){
    this.isClickAddAddress.next();
  }

  get isAddressPopoverClose():Observable<any>{
    return this.isClickAddressPopoverClose.asObservable();
  }
  public clickAddressPopoverClose(){
    this.isClickAddressPopoverClose.next();
  }
  
  
  get isCart():Observable<any>{
    return this.isClickCart.asObservable();
  }
  public clickCart(){
    this.isClickCart.next();
  }

  get isOrder():Observable<any>{
    return this.isClickOrder.asObservable();
  }
  public clickOrder(){
    this.isClickOrder.next();
  }

  get isClickBackHome():Observable<any>{
    return this.isBackHome.asObservable();
  }
  public clickBackHome(){
    this.isBackHome.next();
  }

}
