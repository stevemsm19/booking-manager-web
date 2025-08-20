import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../services/hotel-services';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';
import { HotelBookingDetails } from '../hotels/models/hotel-model';
import { InputFieldComponent } from "../../shared/components/input-field/input-field";
import { ButtonComponent } from "../../shared/components/buttom/button";

@Component({
  selector: 'app-book-stay',
  imports: [FormsModule, ReactiveFormsModule, InputFieldComponent, ButtonComponent],
  templateUrl: './book-stay.html',
  styleUrls: ['./book-stay.scss'],
})
export class BookStayComponent implements OnInit {
  hotelId: string | null = null;
  hotel: any = {};
  checkInDate: string = '';
  checkOutDate: string = '';
  userName: string = 'Oscar M';
https: any;

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
      .getHotelById(hotelId)
      .pipe(
        tap((response: HotelBookingDetails) => {
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
