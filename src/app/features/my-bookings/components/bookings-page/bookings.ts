import { Component, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Booking, BookingStatus } from '../../models/my-bookings.model';
import { BookingCardComponent } from '../booking-card/booking-card';

import { ButtonComponent } from '../../../../shared/components/buttom/button';
import { SideBarComponent } from '../../../../shared/components/side-bar/side-bar';
import { TabItem } from '../../../../shared/components/side-bar/tab-items.model';
import { MyBookingsService } from '../../service/my-bookings.service';

@Component({
  selector: 'app-bookings',
  imports: [
    ButtonComponent,
    RouterLink,
    BookingCardComponent,
    SideBarComponent,
  ],
  templateUrl: './bookings.html',
  styleUrl: './bookings.scss',
})
export class BookingsComponent implements OnInit {
  readonly allBookings = signal<Booking[]>([]);
  readonly filteredBookings = signal<Booking[]>([]);
  readonly activeFilter = signal<BookingStatus>('active');
  readonly currentTitle = signal<string>('Current Bookings');

  bookingOptions: TabItem[] = [
    { id: 'active', label: 'Active Bookings', icon: '📅' },
    { id: 'completed', label: 'Past Bookings', icon: '📋' },
    { id: 'canceled', label: 'Canceled Bookings', icon: '❌' },
  ];

  constructor(private myBookingsService: MyBookingsService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  private loadBookings(): void {
    this.myBookingsService.getAllBookings().subscribe({
      next: (bookings) => {
        this.allBookings.set(bookings);
        this.applyFilter('active');
      },
      error: (err) => {
        console.error('Error loading bookings', err);
      },
    });
  }

  private applyFilter(filter: BookingStatus): void {
    this.activeFilter.set(filter);

    switch (filter) {
      case 'active':
        this.currentTitle.set('Active Bookings');
        this.filteredBookings.set(
          this.allBookings().filter(
            (b) =>
              b.reservationStatus === 'active' &&
              new Date(b.checkOutDate) > new Date()
          )
        );
        break;

      case 'completed':
        this.currentTitle.set('Past Bookings');
        this.filteredBookings.set(
          this.allBookings().filter(
            (b) =>
              b.reservationStatus === 'active' &&
              new Date(b.checkOutDate) < new Date()
          )
        );
        break;

      case 'canceled':
        this.currentTitle.set('Canceled Bookings');
        this.filteredBookings.set(
          this.allBookings().filter((b) => b.reservationStatus === 'canceled')
        );
        break;
    }
  }

  onTabChange(tabId: string): void {
    this.applyFilter(tabId as BookingStatus);
  }

  onCancelBooking(booking: Booking): void {
    
    const checkInDate = new Date(booking.checkInDate);

    const today = new Date();
    today.setHours(0,0,0,0)

    const timeDifference = checkInDate.getTime() - today.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));

    const canRefund = daysDifference >= booking.minDaysForCancel;

    const userConfirmed = confirm(
      canRefund
        ? `You can cancel with full refund. Do you want to cancel your booking at ${booking.hotelName}?`
        : `This reservation is non-refundable. Are you sure you want to cancel?`
    );

    if (userConfirmed) {
      this.myBookingsService.cancelBooking(booking.confirmationCode).subscribe({
        next: () => {
          if (canRefund) {
            alert(
              `Cancellation successful! Full refund will be processed in 3-5 business days.`
            );
          } else {
            alert(
              `Cancellation processed without refund according to hotel policy.`
            );
          }
          this.loadBookings();
        },
        error: (err) => console.error('Error cancelling booking:', err),
      });
    }
  }
}
