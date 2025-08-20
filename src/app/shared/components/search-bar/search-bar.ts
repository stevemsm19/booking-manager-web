import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from "../buttom/button";
import { InputFieldComponent } from "../input-field/input-field";

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, ReactiveFormsModule, ButtonComponent, InputFieldComponent],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss'],
})
export class SearchBarComponent {
  @Output() filtersChanged = new EventEmitter<any>();

  location = '';
  checkInDate = '';
  checkOutDate = '';
  numberOfGuests = '';
  minPrice = '';
  maxPrice = '';

  minCheckInInput = new Date().toISOString().split('T')[0];
  minCheckOutInput = '';
  isCheckOutDisabled = true;

  minPriceInput = 10;
  maxPriceInput = 100000;

  minTravelersInput = 1;
  maxTravelersInput = 16;

  updateCheckOutMinDate() {
    if (this.checkInDate) {
      this.isCheckOutDisabled = false;

      const checkInDate = new Date(this.checkInDate);
      checkInDate.setDate(checkInDate.getDate() + 1);
      this.minCheckOutInput = checkInDate.toISOString().split('T')[0];
    } else {
      this.isCheckOutDisabled = true;
      this.minCheckOutInput = '';
      this.checkOutDate = '';
    }
  }

  onSearch() {
    const filters = {
      location: this.location,
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate,
      numberOfGuests: this.numberOfGuests === null ? 1 : this.numberOfGuests,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      page: 1,
      size: 10,
    };
    this.filtersChanged.emit(filters);
  }

  clearFilters() {
    this.location = '';
    this.checkInDate = '';
    this.checkOutDate = '';
    this.numberOfGuests = '';
    this.minPrice = '';
    this.maxPrice = '';

    this.isCheckOutDisabled = true;

    this.onSearch();
  }
}
