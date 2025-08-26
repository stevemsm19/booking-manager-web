import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { HttpClientService } from '../../../core/services/http-client.service';
import { map } from 'rxjs/operators';
import {
  HotelBookingResponse,
  PaginatedHotelBookingResponse,
} from '../models/hotel-booking.model';
import { Filters } from '../../search-bar/models/filters.model';

@Injectable({
  providedIn: 'root',
})
export class HotelBookingService {
  private readonly baseEndpoint = 'hotels';

  constructor(private apiService: HttpClientService) {}

  getHotelRoomsById(
    hotelId: string,
    filters: Filters
  ): Observable<HotelBookingResponse> {
    let params = new HttpParams();

    Object.keys(filters).forEach((key) => {
      const value = filters[key as keyof Filters];
      if (value !== '' && value !== undefined && value !== null) {
        params = params.set(key, value.toString());
      }
    });

    return this.apiService
      .get<PaginatedHotelBookingResponse>(
        `${this.baseEndpoint}/${hotelId}/rooms`,
        { params }
      )
      .pipe(
        map((res) => {
          const { hotel, rooms } = res.content;

          return {
            hotel: {
              _id: hotel._id,
              title: hotel.title,
              images: hotel.images?.length > 0 ? hotel.images : ['assets/no-image.png'],
              rating: hotel.rating,
              price: hotel.price,
              houseRules: hotel.houseRules,
              cancellationPolicy: hotel.cancellationPolicy,
            },
            rooms: rooms.map((r) => ({
              _id: r._id,
              type: r.type,
              price: r.price,
              capacity: r.capacity,
              selectedQuantity: 0
            })),
          };
        })
      );
  }
}
