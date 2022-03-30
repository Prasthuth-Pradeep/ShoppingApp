import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IReplay, IReview } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

  private url = "http://localhost:3000";
  private refreshNeededSubject = new Subject<void>();

  constructor(private http: HttpClient) { }

  get refreshNotification() {
    return this.refreshNeededSubject;
  }

  getReview(id: number): Observable<IReview[]> {
    return this.http.get<IReview[]>(`${this.url}/reviews/${id}`)
  }

  postReview(review: IReview) {
    return this.http.post(`${this.url}/reviews`, review).pipe(
      tap(() => {
        this.refreshNeededSubject.next();
      })
    );
  }

  getReplay(id: number) {
    return this.http.get<IReplay[]>(`${this.url}/replays/${id}`)
  }
}
