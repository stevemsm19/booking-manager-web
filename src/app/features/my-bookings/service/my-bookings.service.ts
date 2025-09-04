import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Booking, BookingResponse } from '../models/my-bookings.model';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { HttpClientService } from '../../../core/services/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class MyBookingsService {

  constructor(private apiService: HttpClientService) {}

  getAllBookings(): Observable<Booking[]> {
    return this.apiService.get<BookingResponse[]>(API_ENDPOINTS.BOOKINGS.GET_ALL).pipe(
      map((bookings) =>
        bookings.map(b => ({
          confirmationCode: b._id,
          hotelName: b.hotelTitle,
          reservationDate: b.createdAt,
          location: b.location ?? '', 
          rooms: b.rooms.map((r: any) => r.type),
          cancellationPolicy: b.cancellationPolicy,
          checkInDate: b.checkInDate,
          checkOutDate: b.checkOutDate,
          nights: b.nights,
          totalPrice: b.totalPrice,
          minDaysForCancel: b.minDaysForCancel,
          reservationStatus: b.reservationStatus.toLowerCase() 
        }))
      )
    );
  }

  cancelBooking(bookingId: string): Observable<Booking> {
    const requestBody = {
      reservationStatus: 'Canceled',
    };

    return this.apiService.patch(`${API_ENDPOINTS.BOOKINGS.UPDATE(bookingId)}`, requestBody);
  }
}
