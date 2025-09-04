import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { Observable, tap } from 'rxjs';

import { Filters } from '../../../../core/models/filter.model';
import { FiltersService } from '../../../../core/services/filters.service';
import { HotelBookingService } from '../../services/hotel-details.service';
import { HotelBookingResponse, Room } from '../../models/hotel-details.model';
import { CreateBookingRequest } from '../../models/new-booking.model';
import { RoomCardComponent } from '../room-card/room-card';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field';
import { ButtonComponent } from '../../../../shared/components/buttom/button';
import { LoadingSpinnerComponent } from '../../../../shared/components/loading-spinner/loading-spinner';
import { BookingHelperService } from '../../services/booking-helper.service';

@Component({
  selector: 'app-book-stay',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    InputFieldComponent,
    ButtonComponent,
    AsyncPipe,
    RoomCardComponent,
    CurrencyPipe,
    LoadingSpinnerComponent,
  ],
  templateUrl: './booking.html',
  styleUrls: ['./booking.scss'],
})
export class NewBookingComponent implements OnInit {
  hotelId: string | null = null;
  title = '';
  images: string = '';
  rating = 0;
  pricePerNight = 0;
  amountNights = 0;
  minDaysForCancel = 0;

  location = '';
  isCreatingBooking = false;

  minCheckInInput = new Date().toISOString().split('T')[0];
  minCheckOutInput = '';

  totalPrice = 0;
  selectedRooms: { [id: string]: number } = {};
  rooms: Room[] = [];

  cancellationPolicy = signal('');
  hotelDetails$!: Observable<HotelBookingResponse>;
  filters!: Filters;

  bookingForm = new FormGroup({
    checkIn: new FormControl(''),
    checkOut: new FormControl({ value: '', disabled: true }),
    confirm: new FormControl(false),
  });

  get checkInControl() {
    return this.bookingForm.get('checkIn') as FormControl;
  }

  get checkOutControl() {
    return this.bookingForm.get('checkOut') as FormControl;
  }

  get confirmBookingControl() {
    return this.bookingForm.get('confirm') as FormControl;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hoteBookingService: HotelBookingService,
    private filtersService: FiltersService,
    private bookingHelperService: BookingHelperService
  ) {}

  ngOnInit(): void {
    this.hotelDetails$ = this.bookingHelperService
      .initHotelDetails(
        this.route,
        this.filtersService,
        this.hoteBookingService,
        this.checkInControl,
        this.checkOutControl
      )
      .pipe(
        tap((hotelDetails) => {
          this.hotelId = hotelDetails.hotel._id;
          this.title = hotelDetails.hotel.title;
          this.images = hotelDetails.hotel.images[0];
          this.location = hotelDetails.hotel.location;
          this.minDaysForCancel = hotelDetails.hotel.minDaysForCancel;
          this.rating = hotelDetails.hotel.rating;
          this.rooms = hotelDetails.rooms;
        })
      );
  }

  onQuantityChange(updatedRoom: Room) {
    this.selectedRooms[updatedRoom._id] = updatedRoom.selectedQuantity;
    this.pricePerNight = this.bookingHelperService.calculatePricePerNight(
      this.selectedRooms,
      this.rooms
    );
    this.calculateTotal();
  }

  calculateTotal() {
    const { nights, total } = this.bookingHelperService.calculateTotal(
      this.checkInControl.value,
      this.checkOutControl.value,
      this.pricePerNight
    );
    this.amountNights = nights;
    this.totalPrice = total;
  }

  updateCheckOutMinDate() {
    const { minDate, enabled } = this.bookingHelperService.getMinCheckOutDate(
      this.checkInControl.value
    );
    this.minCheckOutInput = minDate;
    if (enabled) {
      this.checkOutControl.enable();
    } else {
      this.checkOutControl.disable();
      this.checkOutControl.reset();
    }
  }

  updateCancellationPolicy(): void {
    const today = new Date();
    today.setHours(0,0,0,0);

    const checkInDate = new Date(`${this.checkInControl.value}T00:00:00`);
    
    const cancelDeadline = new Date(checkInDate);
    cancelDeadline.setUTCDate(checkInDate.getDate() - this.minDaysForCancel);

    if (today <= cancelDeadline) {
      const formattedDate = cancelDeadline.toLocaleDateString('en-EN', {
        day: 'numeric', 
        month: 'short', 
      });

      this.cancellationPolicy.set(`Free cancellation until ${formattedDate}. After this date, the reservation is non-refundable.`);
    } else{
      this.cancellationPolicy.set('The reservation is non-refundable.');
    }
  }

  onSubmitBooking(): void {
    if (!this.confirmBookingControl.value) {
      alert('Please confirm that all information is correct before booking.');
      return;
    }

    if (this.totalPrice <= 0) {
      alert('Please select dates and rooms before booking.');
      return;
    }

    const bookedRooms = Object.entries(this.selectedRooms)
      .filter(([_, qty]) => qty > 0)
      .map(([_id, quantity]) => {
        const room = this.rooms.find((r) => r._id === _id);
        return {
          _id,
          type: room?.type || '',
          quantity,
        };
      });

    if (bookedRooms.length === 0) {
      alert('Please select at least one room before booking.');
      return;
    }

    const bookingData: CreateBookingRequest = {
      hotelId: this.hotelId || '',
      hotelTitle: this.title,
      checkInDate: this.checkInControl.value,
      checkOutDate: this.checkOutControl.value,
      nights: this.amountNights,
      location: this.location,
      rooms: bookedRooms,
      totalPrice: this.totalPrice,
      minDaysForCancel: this.minDaysForCancel,
      cancellationPolicy: this.cancellationPolicy(),
    };

    this.isCreatingBooking = true;

    this.hoteBookingService.createBooking(bookingData).subscribe({
      next: (response) => {
        this.isCreatingBooking = false;
        alert(`
          Reservation successfully created!
          Reservation ID: ${response._id.slice(0, 8)}
          Check-in: ${response.checkInDate.toString().split('T')[0]}
          Check-out: ${response.checkOutDate.toString().split('T')[0]}
          Nights: ${response.nights}
          Total: $${response.totalPrice}
        `);

        this.router.navigate(['/my-bookings']);
      },
      error: (error) => {
        this.isCreatingBooking = false;
        console.error('Error creating booking:', error);
      },
    });
  }
}
