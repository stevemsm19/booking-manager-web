import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpClientService } from '../../core/services/http-client-services';
import { map } from 'rxjs/operators';
import { Hotel, HotelBookingDetails } from '../hotels/models/hotel-model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private readonly baseEndpoint = 'hotels';

  constructor(private apiService: HttpClientService) {}

  getHotels(filters: Record<string, string | number>): Observable<Hotel[]> {
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key] !== '') {
        params = params.set(key, filters[key]);
      }
    });

    return this.apiService.get<any>(`${this.baseEndpoint}/search`, { params }).pipe(
      map((res) =>
        res.content.map((h: Hotel) => ({
          _id: String(h._id),
          images: h.images?.length > 0 ? h.images[0] : 'assets/no-image.png',
          title: h.title,
          location: h.location,
          rating: h.rating,
          price: h.price,
        }))
      )
    );
  }

  getHotelById(hotelId: string): Observable<HotelBookingDetails> {
    return this.apiService.get<any>(`${this.baseEndpoint}/${hotelId}`).pipe(
      map((res) => ({
        _id: res._id,
        title: res.title,
        houseRules: res.houseRules,
        cancellationPolicy: res.cancellationPolicy,
      }))
    );
  }

}
