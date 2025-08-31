import { Injectable, signal } from '@angular/core';

import { Observable, tap } from 'rxjs';

import { API_ENDPOINTS } from '../constants/api-endpoints';
import { HttpClientService } from './http-client.service';
import { LocalStorageService } from './local-storage.service';

interface LoginResponse {
  idToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = signal<boolean>(false);

  constructor(
    private apiService: HttpClientService,
    private localStorageService: LocalStorageService
  ) {
    const isToken = this.getToken() ? true : false;
    this.isLoggedIn.set(isToken);
  }

  register(email: string, password: string): Observable<LoginResponse> {
    const payload = { email, password };
    return this.apiService.post<LoginResponse>(API_ENDPOINTS.AUTH.REGISTER, payload);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const payload = { email, password };
    return this.apiService.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, payload).pipe(
      tap((response: LoginResponse) => {
        this.isLoggedIn.set(true);
        this.localStorageService.setItem('accessToken', response.idToken);
      })
    );
  }

  getToken(): string | null {
    return this.localStorageService.getItem('accessToken');
  }

  logout(): void {
    this.isLoggedIn.set(false);
    this.localStorageService.removeItem('accessToken');
  }
}
