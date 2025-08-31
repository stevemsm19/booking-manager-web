import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Booking, BookingStatus } from '../../models/my-bookings.model';
import { BookingCardComponent } from '../booking-card/booking-card';

import { ButtonComponent } from '../../../../shared/components/buttom/button';

type BookingFilter = 'current' | 'past' | 'canceled';

@Component({
  selector: 'app-bookings',
  imports: [ButtonComponent, RouterLink, BookingCardComponent],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss',
})
export class BookingsComponent implements OnInit {
  readonly allBookings = signal<Booking[]>([]);
  readonly filteredBookings = signal<Booking[]>([]);
  readonly activeFilter = signal<BookingFilter>('current');
  readonly currentTitle = signal<string>('Current Bookings');

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
        status: "Completed"
      },
      {
        id: '2',
        hotelName: 'Hotel Plaza',
        location: 'Bogotá',
        confirmationCode: '7891011123',
        rooms: ['Double'],
        cancellationPolicy: 'Non-refundable reservation.',
        checkInDate: '2025-08-20',
        checkOutDate: '2025-08-22',
        nights: 2,
        totalPrice: 320,
        status: "Completed"
      },
      {
        id: '3',
        hotelName: 'Hotel Colonial',
        location: 'Medellín',
        confirmationCode: '4567891234',
        rooms: ['Single'],
        cancellationPolicy:'Non-refundable reservation.',
        checkInDate: '2024-12-10',
        checkOutDate: '2024-12-12',
        nights: 2,
        totalPrice: 240,
        status: "Completed"
      },
    ];

    this.allBookings.set(bookings);
    this.showCurrentBookings(); 
  }

  showCurrentBookings(): void {
    this.activeFilter.set('current');
    this.currentTitle.set('Current Bookings');
    
    const currentBookings = this.allBookings().filter(booking => 
      booking.status === 'Active'
    );
    this.filteredBookings.set(currentBookings);
  }

  showPastBookings(): void {
    this.activeFilter.set('past');
    this.currentTitle.set('Past Bookings');
    
    const pastBookings = this.allBookings().filter(booking => 
      booking.status === 'Completed'
    );
    this.filteredBookings.set(pastBookings);
  }

  showCanceledBookings(): void {
    this.activeFilter.set('canceled');
    this.currentTitle.set('Canceled Bookings');
    
    const canceledBookings = this.allBookings().filter(booking => 
      booking.status === 'Canceled'
    );
    this.filteredBookings.set(canceledBookings);
  }

  getButtonColor(filter: BookingFilter): 'primary' | 'secondary' {
    return this.activeFilter() === filter ? 'primary' : 'secondary';
  }

  isCurrentActive(): boolean {
    return this.activeFilter() === 'current';
  }

  isPastActive(): boolean {
    return this.activeFilter() === 'past';
  }

  isCanceledActive(): boolean {
    return this.activeFilter() === 'canceled';
  }
}