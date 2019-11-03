import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiAuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const key = environment.weather.api_key;
    const api = environment.weather.api;

    if (request.url.startsWith(api)) {
      request = request.clone({
        url: `${request.url}&appid=${key}`
      });
    }

    return next.handle(request);
}
}
