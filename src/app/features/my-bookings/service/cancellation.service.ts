import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Booking } from '../../my-bookings/models/my-bookings.model';
import { API_ENDPOINTS } from '../../../core/constants/api-endpoints';
import { HttpClientService } from '../../../core/services/http-client.service';

@Injectable({
  providedIn: 'root',
})
export class HotelBookingService {

  constructor(private apiService: HttpClientService) {}

  cancelBooking(bookingId: string): Observable<Booking> {
    const requestBody = {
      reservationStatus: 'Cancelled',
    };

    return this.apiService.patch(`${API_ENDPOINTS.BOOKINGS.UPDATE(bookingId)}`, requestBody );
  }
}
