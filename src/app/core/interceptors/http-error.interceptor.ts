import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LocalStorageService } from '../services/local-storage.service';
import { HTTP_STATUS_CODE } from '../constants/status-constants';

@Injectable()
export class HttpErrorInterceptor {
  constructor(private localStorage: LocalStorageService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    handler: HttpHandler
  ): Observable<HttpEvent<any>> {
    return handler.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === HTTP_STATUS_CODE.UNAUTHORIZED) {
          console.log('Unauthorized access');
          this.localStorage.clear();
          this.router.navigate(['/auth/login'])
        } else if (error.status === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
          console.log('Server error');
          //Todo: Handle the 500 error if necessary
        } else if (error.status === HTTP_STATUS_CODE.NOT_FOUND) {
          console.log('Not Found');
          //Todo: Handle the 404 error if necessary
          // Todo: Create a message service to show the errors
        }

        throw error;
      })
    );
  }
}
