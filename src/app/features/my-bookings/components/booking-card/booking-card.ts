import { Component, Input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';

import { Booking } from '../../models/my-bookings.model';
import { ButtonComponent } from '../../../../shared/components/buttom/button';
import { HotelBookingService } from '../../../new-bookings/services/hotel-details.service';

@Component({
  selector: 'app-booking-card',
  imports: [CurrencyPipe, ButtonComponent, DatePipe],
  templateUrl: './booking-card.html',
  styleUrl: './booking-card.scss',
})
export class BookingCardComponent {
  @Input() booking!: Booking;
  @Input() todayDate = new Date();

  constructor(private hotelBookingService: HotelBookingService) {}

  onViewDetailsClick(): void {
    const checkInDate = new Date(this.booking.checkInDate);
    const currentDate = new Date(this.todayDate);
    
    const timeDifference = checkInDate.getTime() - currentDate.getTime();
    const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
    
    let userConfirmed = false;
    let isRefundable = false;
    
    if (daysDifference > 14) {
      userConfirmed = confirm('You have more than 14 days until check-in, so you can cancel with a full refund. Are you sure you want to cancel?');
      isRefundable = true;
    } else if (daysDifference >= 0) {
      userConfirmed = confirm(`Your reservation is non-refundable. There are only ${daysDifference} days left until check-in, which is within the non-refundable period (less than 14 days). Are you sure you want to cancel?`);
      isRefundable = false;
    }
    
    if (userConfirmed) {
      this.processCancellation(isRefundable);
    }
  }

  private processCancellation(isRefundable: boolean): void {
    this.hotelBookingService.cancelBooking(this.booking.id).subscribe({
      next: () => {
        if (isRefundable) {
          alert(`Cancellation successful! Your reservation for ${this.booking.hotelName} has been cancelled with full refund. The money will be refunded within 3-5 business days.`);
        } else {
          alert(`Cancellation processed. Your reservation for ${this.booking.hotelName} has been cancelled without refund according to hotel policies.`);
        }
        
        console.log(`Booking ${this.booking.id} cancelled successfully. Refundable: ${isRefundable}`);
      },
      error: (error) => {
        console.error('Error cancelling booking:', error);
      }
    });
  }
}