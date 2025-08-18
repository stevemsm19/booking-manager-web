import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Hotel } from '../interfaces/hotel-interface';
import { HotelApiService } from '../api/hotel-api';
import { HotelDetails } from '../interfaces/hotel-details';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private hotelApi = inject(HotelApiService);

  getHotels(filters: Record<string, string | number> = {}): Observable<Hotel[]> {
    
    return this.hotelApi.searchHotels(filters).pipe(
      map((res) =>
        res.content.map((h: Hotel) => ({
          _id: String(h._id),
          images: h.images?.length > 0 ? h.images[0] : 'assets/no-image.png',
          title: h.title,
          location: h.location,
          rating: h.rating,
          price: h.price
        }))
      )
    );
  }

  getHotelDetails(hotelId: string): Observable<HotelDetails> {
    return this.hotelApi.getHotelById(hotelId).pipe(
      map((res) => ({
        title: res.title,
        houseRules: res.houseRules,
        cancellationPolicy: res.cancellationPolicy,
      }))
    );
  }
}
