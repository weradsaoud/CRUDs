import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Authorization: string = localStorage.getItem('token')?? "";
    return next.handle(httpRequest.clone({
      setHeaders: {
        Authorization: Authorization,
        ContentType: 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }));
  }
}
