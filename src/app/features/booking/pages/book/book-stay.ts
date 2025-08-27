import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, CurrencyPipe } from '@angular/common';

import { Observable, switchMap, tap } from 'rxjs';

import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';
import { ButtonComponent } from '../../../../shared/components/buttom/button.component';
import { HotelFiltersService } from '../../../hotels/services/hotel-filters.service';
import { HotelBookingResponse, Room } from '../../models/hotel-booking.model';
import { Filters } from '../../../search-bar/models/filters.model';
import { HotelBookingService } from '../../services/hotel-booking.service';
import { RoomCardComponent } from '../../components/room-card/room-card.component';

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
  ],
  templateUrl: './book-stay.html',
  styleUrls: ['./book-stay.scss'],
})
export class BookStay implements OnInit {
  hotelId: string | null = null;
  hotelDetails$!: Observable<HotelBookingResponse>;
  filters!: Filters;

  title = '';
  images: string = '';
  rating: number = 0;
  pricePerNight: number = 0;
  amountNights: number = 0;
  cancellationPolicy: string = '';

  checkInControl = new FormControl('');
  checkOutControl = new FormControl('');
  minCheckInInput = new Date().toISOString().split('T')[0];
  userName: string = 'Oscar M';

  totalPrice: number = 0;
  selectedRooms: { [id: string]: number } = {};
  rooms: Room[] = [];

  constructor(
    private route: ActivatedRoute,
    private hoteBookingService: HotelBookingService,
    private filtersService: HotelFiltersService
  ) {}

  ngOnInit(): void {
    this.hotelDetails$ = this.route.paramMap.pipe(
      switchMap((params) => {
        this.hotelId = params.get('id');
        this.filters = this.filtersService.currentFilters;

        this.checkInControl.setValue(this.filters.checkIn || '');
        this.checkOutControl.setValue(this.filters.checkOut || '');

        return this.hoteBookingService.getHotelRoomsById(
          this.hotelId!,
          this.filters
        );
      }),
      tap((hotelDetails) => {
        this.title = hotelDetails.hotel.title;
        this.images = hotelDetails.hotel.images[0];
        this.cancellationPolicy = hotelDetails.hotel.cancellationPolicy;
        this.rating = hotelDetails.hotel.rating;
        this.rooms = hotelDetails.rooms;
      })
    );
  }

  onQuantityChange(updatedRoom: Room) {
    this.selectedRooms[updatedRoom._id] = updatedRoom.selectedQuantity;

    this.pricePerNight = Object.entries(this.selectedRooms).reduce(
      (acc, [roomId, qty]) => {
        const room = this.rooms.find((r) => r._id === roomId);
        if (room) {
          return acc + room.price * qty;
        }
        return acc;
      },
      0
    );

    this.calculateTotal();
  }

  calculateTotal() {
    const checkIn = this.checkInControl.value;
    const checkOut = this.checkOutControl.value;

    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);

      if (!isNaN(start.getTime()) && !isNaN(end.getTime()) && end > start) {
        const diffTime = end.getTime() - start.getTime();
        const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        this.amountNights = nights;

        this.totalPrice = this.pricePerNight * nights;
        return;
      }
    }

    this.totalPrice = 0;
  }

  onSubmitBooking(): void {
    if (this.totalPrice <= 0) {
      alert('Please select dates and rooms before booking.');
      return;
    }

    const bookedRooms = Object.entries(this.selectedRooms)
      .filter(([_, qty]) => qty > 0)
      .map(([_id, qty]) => {
        const room = this.rooms.find((r) => r._id === _id);
        return {
          _id,
          type: room?.type,
          quantity: qty,
        };
      });

    const bookingSummary = {
      hotelId: this.hotelId,
      hotelTitle: this.title,
      checkInDate: this.checkInControl.value,
      checkOutDate: this.checkOutControl.value,
      nights: this.amountNights,
      userName: this.userName,
      rooms: bookedRooms,
      totalPrice: this.totalPrice,
    };

    console.log('Booking sent:', bookingSummary);

    //Todo: Connect to the API
    alert(`
    Reserva confirmada:
    Usuario: ${this.userName}
    Check-in: ${this.checkInControl.value}
    Check-out: ${this.checkOutControl.value}
    Noches: ${this.amountNights}
    Total: $${this.totalPrice}
  `);
  }
}
