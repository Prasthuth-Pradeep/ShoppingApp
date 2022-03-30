import { IAddress } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IuserDetails } from '../models/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = "http://localhost:3000";
  private refreshNeededSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNotification() {
    return this.refreshNeededSubject;
  }

  getUserDetails(id: number): Observable<IuserDetails[]> {
    return this.http.get<IuserDetails[]>(`${this.url}/user/${id}`)
  }

  addAddress(addressData: IAddress) {
    return this.http.post(`${this.url}/address`, addressData).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

  getAddress(id: number): Observable<IAddress[]> {
    return this.http.get<IAddress[]>(`${this.url}/address/${id}`)
  }

  deleteAddress(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/address/${id}`).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

  addDefaultAddress(defaultAddressData: any) {
    return this.http.put(`${this.url}/user/default-address`, defaultAddressData).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

  getDefaultAddress(id: number): Observable<IAddress[]> {
    return this.http.get<IAddress[]>(`${this.url}/user/default-address/${id}`)
  }

}
