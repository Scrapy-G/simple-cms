import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PagesService {
  private readonly baseUrl = 'http://localhost:8000/api/pages/';

  savePage(page: any): Observable<any> {
    const data = new FormData();
    Object.keys(page).forEach((key) => data.append(key, page[key]));
    return this.http
      .post(this.baseUrl, data)
      .pipe(catchError(this.handleError));
  }

  getPage(title: string): Observable<any> {
    return this.http
      .get(this.baseUrl + title)
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

    return throwError(() => new Error(error.error.message));
  }

  constructor(private http: HttpClient) {}
}
