import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,  
} from '@angular/common/http';
import { routes } from './app.routes';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor'; 
import { AuthTokenInterceptor } from './core/interceptors/auth-token.interceptor';
import { LoggingInterceptor } from './core/interceptors/logging.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    
    provideHttpClient(
      withFetch(),
      withInterceptorsFromDi()  
    ),
    
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },  
    { provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor,  multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor,  multi: true },
  ],
};
