import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:3000/'; 

  constructor(private http: HttpClient) {}

  get<T>(url: string, options: object = {}): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${url}`, options);
  }

  post<T>(url: string, data: any, options: object = {}): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${url}`, data, options);
  }

  put<T>(url: string, data: any, options: object = {}): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${url}`, data, options);
  }

  patch<T>(url: string, data: any, options: object = {}): Observable<T> {
    return this.http.patch<T>(`${this.baseUrl}${url}`, data, options);
  }

  delete<T>(url: string, options: object = {}): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${url}`, options);
  }
}
