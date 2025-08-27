import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Booking } from '../../models/hotel-booking.model';
import { ButtonComponent } from '../../../../shared/components/buttom/button.component';
import { BookingCardComponent } from '../../components/booking-card/booking-card.component';


@Component({
  selector: 'app-bookings',
  imports: [ButtonComponent, RouterLink, BookingCardComponent],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss',
})
export class Bookings {
  bookings = signal<Booking[]>([]);
  todayDate = new Date();

  ngOnInit(): void {
    const bookings: Booking[] = [
      {
        id: '1',
        hotelName: 'Hotel Palmar',
        location: 'Cartagena',
        confirmationCode: '3534543545',
        rooms: ['Triple', 'Single'],
        cancellationPolicy:
          'Free cancellation before 1:00 PM on Jul 29. After that, the reservation is non-refundable.',
        checkInDate: '2025-09-26',
        checkOutDate: '2025-09-27',
        nights: 1,
        totalPrice: 180,
      },
    ];

    this.bookings.set(bookings);
  }
}