import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IRestaurant } from '../model/restaurant';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  private apiBaseUrl = 'http://opentable.herokuapp.com/api';
  private fullParam: string;
  constructor(private http: HttpClient) { }

  getAllCities(): Observable<any> {
    return this.http.get<any>(`${this.apiBaseUrl}/cities`)
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }
  getRestaurants(paramName: string, param: string, count: number = 25): Observable<any> {
    this.fullParam = `${paramName}=${param}`;
    return this.http.get<any>(`${this.apiBaseUrl}/restaurants?${this.fullParam}&per_page=${count}`)
    .pipe(
      tap(data => data),
      catchError(this.handleError)
    );
  }

  getRestaurant(id: number): Observable<IRestaurant> {
    return this.http.get<IRestaurant>(`${this.apiBaseUrl}/restaurants/${id}`).pipe(
      tap(res => res),
      catchError(this.handleError)
    );
  }


  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
