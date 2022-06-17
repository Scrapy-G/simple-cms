import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import Listing from 'src/types/types';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListingsService {
  private readonly baseUrl = 'http://localhost:8000/api/listings/';

  getListings(): Observable<any> {
    return this.http.get(this.baseUrl).pipe(catchError(this.handleError));
  }

  addListing(listing: any) {
    return this.http
      .post(this.baseUrl, listing)
      .pipe(catchError(this.handleError));
  }

  removeListing(id: number) {
    return this.http
      .delete(this.baseUrl + id)
      .pipe(catchError(this.handleError));
  }

  updateListing(id: number, formData: FormData) {
    formData.append('_method', 'put');
    console.log('title', formData.get('title'));
    return this.http
      .post(this.baseUrl + id, formData)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }

    return throwError(() => error.error);
  }

  constructor(private http: HttpClient) {}
}
