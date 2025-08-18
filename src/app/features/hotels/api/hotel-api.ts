import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api-services';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HotelApiService {
  private api = inject(ApiService);
  private readonly baseEndpoint = 'hotels';

  searchHotels(filters: Record<string, string | number>): Observable<any> {
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    });

    return this.api.get<any>(`${this.baseEndpoint}/search`, { params });
  }

  getHotelById(hotelId: string): Observable<any> {
    return this.api.get<any>(`${this.baseEndpoint}/${hotelId}`);
  }
}
