import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Booking, BookingStatus } from '../../models/my-bookings.model';
import { BookingCardComponent } from '../booking-card/booking-card';

import { ButtonComponent } from '../../../../shared/components/buttom/button';
import { SideBarComponent } from '../../../../shared/components/side-bar/side-bar';
import { TabItem } from '../../../../shared/components/side-bar/tab-items.model';

@Component({
  selector: 'app-bookings',
  imports: [ButtonComponent, RouterLink, BookingCardComponent, SideBarComponent],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss',
})
export class BookingsComponent implements OnInit {
  readonly allBookings = signal<Booking[]>([]);
  readonly filteredBookings = signal<Booking[]>([]);
  readonly activeFilter = signal<BookingStatus>('active');
  readonly currentTitle = signal<string>('Current Bookings');

  bookingOptions: TabItem[] = [
    { id: 'active', label: 'Current Bookings', icon: '📅' },
    { id: 'completed', label: 'Past Bookings', icon: '📋' },
    { id: 'canceled', label: 'Canceled Bookings', icon: '❌' }
  ];

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
        status: "Active"
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
    this.applyFilter('active'); 
  }

  private applyFilter(filter: BookingStatus): void {
    console.log(filter)
    this.activeFilter.set(filter);

    switch (filter) {
      case 'active':
        this.currentTitle.set('Current Bookings');
        this.filteredBookings.set(
          this.allBookings().filter(b => b.status === 'Active')
        );
        break;

      case 'completed':
        this.currentTitle.set('Past Bookings');
        this.filteredBookings.set(
          this.allBookings().filter(b => b.status === 'Completed')
        );
        break;

      case 'canceled':
        this.currentTitle.set('Canceled Bookings');
        this.filteredBookings.set(
          this.allBookings().filter(b => b.status === 'Canceled')
        );
        break;
    }
  }

  onTabChange(tabId: string): void {
    this.applyFilter(tabId as BookingStatus);
  }
}
