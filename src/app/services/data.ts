import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Data {
  private apiUrl = 'http://localhost:3000/hotels/search';

  constructor(private http: HttpClient) {}

  getHotels(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
