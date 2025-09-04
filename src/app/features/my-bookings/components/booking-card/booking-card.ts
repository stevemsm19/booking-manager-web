import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { SlicePipe } from '@angular/common';

import { Booking } from '../../models/my-bookings.model';
import { ButtonComponent } from '../../../../shared/components/buttom/button';

@Component({
  selector: 'app-booking-card',
  imports: [CurrencyPipe, ButtonComponent, DatePipe, SlicePipe],
  templateUrl: './booking-card.html',
  styleUrl: './booking-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCardComponent {
  @Input() booking!: Booking;
  @Input() todayDate = new Date();
  @Output() cancel = new EventEmitter<Booking>();

  onCancelClick(): void {
    this.cancel.emit(this.booking);
  }

  isActive(): boolean {
    return (
      this.booking.reservationStatus === 'active' &&
      new Date(this.booking.checkOutDate) > new Date()
    );
  }

  isCancelable(): boolean {
    return (
      this.booking.reservationStatus === 'active' &&
      new Date(this.booking.checkInDate) > new Date()
    );
  }
}