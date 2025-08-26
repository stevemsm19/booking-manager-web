import { Injectable, signal } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { Observable, tap } from 'rxjs';
import { HttpClientService } from './http-client.service';

interface LoginResponse {
  idToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'auth/login';
  private registerUrl = 'auth/register';
  isLoggedIn = signal<boolean>(false); 

  constructor(
    private apiService: HttpClientService,
    private localStorageService: LocalStorageService
  ) {}

  register(email: string, password: string): Observable<LoginResponse> {
    const payload = { email, password };
    return this.apiService.post<LoginResponse>(this.registerUrl, payload);
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const payload = { email, password };
    return this.apiService.post<LoginResponse>(this.loginUrl, payload).pipe(
      tap((response: LoginResponse) => {
        this.isLoggedIn.set(true);
        this.localStorageService.setItem('accessToken', response.idToken);
      })
    );
  }

  getToken(): string | null {
    return this.localStorageService.getItem<string>('accessToken');
  }

  logout(): void {
    this.isLoggedIn.set(false);
    this.localStorageService.removeItem('accessToken');
  }
}
