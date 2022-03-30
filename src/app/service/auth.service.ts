import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';
import { IUser } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "http://localhost:3000/auth";

  userId!: Pick<IUser, "id">
  user!: IUser;
  userRole:string = 'guest';
  
  isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isUserSubject = new BehaviorSubject<any>('');

  constructor(private http: HttpClient,
    private router: Router,    
  ) {}

  signUp(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(`${this.url}/sign-up`, user)
  }

  signIn(user: IUser): Observable<{ tocken: string; userId: Pick<IUser, "id"> }> {
    return this.http.post<any>(`${this.url}/sign-in`, user).pipe(
      first(), tap((
        tockenObject: { tocken: string; userId: Pick<IUser, "id">; role:string }
      ) => {
        localStorage.setItem("tocken", tockenObject.tocken);
        this.userId = tockenObject.userId;
        this.userRole = tockenObject.role;
        this.user = this.getUser(tockenObject.tocken);
        this.isUserSubject.next(this.userId)
        this.isUserLoggedIn.next(true);
        
        if (this.userRole === 'admin'){
          this.router.navigate(['admin'])
        } 

        if (this.userRole === 'controller'){
          this.router.navigate(['admin'])
        } 
        
        if (this.userRole === 'costumer'){
          this.router.navigate(["home/deals"])
        }
      })
    )
  }

  private getUser(tocken: string): IUser {
    return JSON.parse(atob(tocken.split('.')[1])) as IUser;
  }

  isUserId(): Observable<string> {
    return this.isUserSubject.asObservable();
  }

  isUserStatus(): Observable<boolean> {
    return this.isUserLoggedIn.asObservable();
  }


}
