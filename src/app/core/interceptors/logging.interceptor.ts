import { HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { finalize, tap } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable()
export class LoggingInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const started = Date.now();
    let ok: string;

    return next.handle(req).pipe(
      tap({
        next: (event) => (ok = event instanceof HttpResponse ? 'succeeded' : ''),
        error: (error) => (ok = 'failed')
      }),
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}"
           ${ok} in ${elapsed} ms.`;
        console.log(msg)
      })
    );
  }
}