import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Filters } from '../../../core/models/filter.model';
import { HttpClientService } from '../../../core/services/http-client.service';

import { HotelBookingResponse, PaginatedHotelBookingResponse} from '../models/hotel-booking.model';
import { Booking } from '../../my-bookings/models/my-bookings.model';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class HotelBookingService {

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
      .get<PaginatedHotelBookingResponse>(`${API_ENDPOINTS.HOTELS.GET_ROOMS(hotelId)}`,{ params })
      .pipe(
        map((res) => {
          const { hotel, rooms } = res.content;

          return {
            hotel: {
              _id: hotel._id,
              title: hotel.title,
              images:
                hotel.images?.length > 0
                  ? hotel.images
                  : ['assets/no-image.png'],
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
              selectedQuantity: 0,
            })),
          };
        })
      );
  }

  cancelBooking(bookingId: string): Observable<Booking> {
    const requestBody = {
      reservationStatus: 'Cancelled',
    };

    return this.apiService.patch(`${API_ENDPOINTS.BOOKINGS.UPDATE(bookingId)}`, requestBody );
  }
}
