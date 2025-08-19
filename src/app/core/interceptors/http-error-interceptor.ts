import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LocalStorageService } from '../auth/services/local-storage';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private localStorage: LocalStorageService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    return handler.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401) {
          console.log('Unauthorized access');
          this.localStorage.clear();
          this.router.navigate(['/login'])
        } else if (error.status === 500) {
          console.log('Server error');
          //Todo: Handle the 500 error if necessary
        } else if (error.status === 404) {
          console.log('Not Found');
          //Todo: Handle the 404 error if necessary
        }

        throw error;
      })
    );
  }
}
