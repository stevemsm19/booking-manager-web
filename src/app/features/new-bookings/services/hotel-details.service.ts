import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { Filters } from '../../../core/models/filter.model';
import { HttpClientService } from '../../../core/services/http-client.service';

import { HotelBookingResponse, PaginatedHotelBookingResponse} from '../models/hotel-details.model';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { CreateBookingRequest, CreateBookingResponse, UserInfo } from '../models/new-booking.model';

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
              location: hotel.location,
              houseRules: hotel.houseRules,
              minDaysForCancel: hotel.minDaysForCancel,
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

  createBooking(bookingData: CreateBookingRequest): Observable<CreateBookingResponse> {
    return this.apiService.get<UserInfo>(API_ENDPOINTS.USER.GET_INFO)
      .pipe(
        switchMap((userInfo: UserInfo) => {
          const bookingWithUserId = {
            ...bookingData,
            userId: userInfo._id
          };
          
          return this.apiService.post<CreateBookingResponse>(
            API_ENDPOINTS.BOOKINGS.CREATE,
            bookingWithUserId
          );
        })
      );
  }
}
