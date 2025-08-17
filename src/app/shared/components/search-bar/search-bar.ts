import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <div class="search-bar">
      <div class="search-item where">
        <label>Where to?</label>
        <input
          type="text"
          placeholder="Destination"
          class="search-input"
          [(ngModel)]="location"
        />
      </div>

      <div class="search-item dates">
        <label>Dates</label>
        <div class="double-input">
          <input
            type="date"
            placeholder="Check-in"
            class="search-input"
            [min]="minCheckInInput"
            [(ngModel)]="checkInDate"
            (ngModelChange)="updateCheckOutMinDate()"
          />
          <input
            type="date"
            placeholder="Check-out"
            class="search-input"
            [min]="minCheckOutInput"
            [(ngModel)]="checkOutDate"
            [disabled]="isCheckOutDisabled"
          />
        </div>
      </div>

      <div class="search-item travelers">
        <label>Travelers</label>
        <input
          type="number"
          placeholder="Guests"
          class="search-input"
          [min]="minTravelersInput"
          [max]="maxTravelersInput"
          [(ngModel)]="numberOfGuests"
        />
      </div>

      <div class="search-item price">
        <label>Price Range</label>
        <div class="double-input">
          <input
            type="number"
            placeholder="Min"
            class="search-input"
            [min]="minPriceInput"
            [max]="maxPriceInput"
            [(ngModel)]="minPrice"
          />
          <input
            type="number"
            placeholder="Max"
            class="search-input"
            [min]="minPriceInput"
            [max]="maxPriceInput"
            [(ngModel)]="maxPrice"
          />
        </div>
      </div>

      <button mat-raised-button class="search-btn" (click)="onSearch()">
        Search
      </button>
    </div>
  `,
  styleUrls: ['./search-bar.scss'],
})
export class SearchBar {
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
      numberOfGuests: this.numberOfGuests,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      page: 1,
      size: 10,
    };
    this.filtersChanged.emit(filters);
  }
}
