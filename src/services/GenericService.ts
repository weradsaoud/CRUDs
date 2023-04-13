import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { SharedProperties } from 'src/models/SharedProperties';


export abstract class GenericService<T extends SharedProperties<T>> {

  constructor(
    private httpClient: HttpClient,
    private tConstructor: { new(m: Partial<T>, ...args: unknown[]): T },
    protected apiUrl: string
  ) { }

  public create(resource: Partial<T> & { toJson: () => T }): Observable<T> {
    return this.httpClient
      .post<T>(`${this.apiUrl}/admin/full`, resource.toJson())
      .pipe(
        catchError(this.handleError),
        map((result) => new this.tConstructor(result))
      );
  }

  public get(): Observable<T[]> {
    return this.httpClient
      .get<T[]>(`${this.apiUrl}`)
      .pipe(
        catchError(this.handleError),
        map((result) => result.map((i) => new this.tConstructor(i)))
      );
  }

  public getById(id: number): Observable<T> {
    return this.httpClient
      .get<T>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError),
        map((result) => new this.tConstructor(result))
      );
  }

  public update(resource: Partial<T> & { toJson: () => T }): Observable<T> {
    return this.httpClient
      .put<T>(`${this.apiUrl}/admin/full`, resource.toJson())
      .pipe(
        catchError(this.handleError),
        map((result) => new this.tConstructor(result))
      );
  }

  public delete(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(`${this.apiUrl}/admin/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error(error.error.eo.enName));
  }
}
