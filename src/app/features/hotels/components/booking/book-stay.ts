import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../services/hotel-services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { HotelDetails } from '../../interfaces/hotel-details';

@Component({
  selector: 'app-book-stay',
  imports: [FormsModule, ReactiveFormsModule],
  template: `<div class="booking-container">
    <h1>{{ hotel.title }}</h1>
    <h2>Booking Details</h2>

    <div>
      <h3>Booking Dates</h3>
      <div>
        <label for="checkIn">Check-in:</label>
        <input type="date" id="checkIn" [(ngModel)]="checkInDate" />
      </div>

      <div>
        <label for="checkOut">Check-out:</label>
        <input type="date" id="checkOut" [(ngModel)]="checkOutDate" />
      </div>

      <div>
        <p>Booking for: {{ userName }}</p>
      </div>
    </div>

    <div>
      <h3>House Rules</h3>
      <p>{{ hotel.houseRules }}</p>

      <h3>Cancellation Policy</h3>
      <p>{{ hotel.cancellationPolicy }}</p>
    </div>

    <button (click)="onSubmitBooking()" mat-raised-button color="primary">
      Book Now
    </button>
  </div> `,
  styleUrls: ['./book-stay.scss'],
})
export class BookStayComponent implements OnInit {
  hotelId: string | null = null;
  hotel: any = {};
  checkInDate: string = '';
  checkOutDate: string = '';
  userName: string = 'Oscar M';

  constructor(
    private route: ActivatedRoute,
    private hotelService: HotelService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.hotelId = params.get('id');
      if (this.hotelId) {
        this.loadHotelDetails(this.hotelId);
      }
    });
  }

  loadHotelDetails(hotelId: string): void {
    this.hotelService
      .getHotelDetails(hotelId)
      .pipe(
        tap((response: HotelDetails) => {
          this.hotel = response;
          console.log(this.hotel.title); 
        })
      )
      .subscribe(); 
  }

  onSubmitBooking(): void {
    console.log('Booking sent:', {
      hotelId: this.hotelId,
      checkInDate: this.checkInDate,
      checkOutDate: this.checkOutDate,
      userName: this.userName,
    });
  }
}
