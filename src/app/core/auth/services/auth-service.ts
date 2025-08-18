import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api-services';
import { LocalStorageService } from './local-storage';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
  idToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'auth/login';  

  constructor(
    private apiService: ApiService, 
    private localStorageService: LocalStorageService 
  ) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const payload = { email, password };
    return this.apiService.post<LoginResponse>(this.loginUrl, payload).pipe(
      tap((response: LoginResponse) => {
        this.localStorageService.setItem('accessToken', response.idToken);
      })
    );
  }

  getToken(): string | null {
    return this.localStorageService.getItem<string>('accessToken');
  }

  logout(): void {
    this.localStorageService.removeItem('accessToken');
  }
}
