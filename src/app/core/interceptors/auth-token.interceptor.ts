import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs';

import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthTokenInterceptor {
  constructor(private localStorageService: LocalStorageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.localStorageService.getItem('accessToken');
    if (token) {
      const reqWithToken = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` },
      });

      return next.handle(reqWithToken);
    }
    return next.handle(req);
  }
}
