import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <div class="search-bar">
      <div class="search-item where">
        <label>Where to?</label>
        <input type="text" placeholder="Destination" class="search-input" />
      </div>

      <div class="search-item dates">
        <label>Dates</label>

        <div class="double-input">
          <input
            type="date"
            placeholder="Check-in"
            class="search-input"
            [min]="minCheckInDate"
            [(ngModel)]="checkInDate"
            (ngModelChange)="updateCheckOutMinDate()"
          />

          <input
            type="date"
            placeholder="Check-out"
            class="search-input"
            [min]="minCheckOutDate"
          />
        </div>
      </div>

      <div class="search-item travelers">
        <label>Travelers</label>
        <input type="number" placeholder="Guests" class="search-input" />
      </div>

      <div class="search-item price">
        <label>Price Range</label>
        <div class="double-input">
          <input type="text" placeholder="Min" class="search-input" />
          <input type="text" placeholder="Max" class="search-input" />
        </div>
      </div>

      <button mat-raised-button class="search-btn">Search</button>
    </div>
  `,
  styleUrls: ['./search-bar.scss'],
})
export class SearchBar {
  minCheckInDate = new Date().toISOString().split('T')[0];
  minCheckOutDate = '';
  checkInDate: string | null = null;
  isCheckOutDisabled = true;

  updateCheckOutMinDate() {
    if (this.checkInDate) {
      this.isCheckOutDisabled = false;

      const checkInDate = new Date(this.checkInDate);
      checkInDate.setDate(checkInDate.getDate() + 1);
      this.minCheckOutDate = checkInDate.toISOString().split('T')[0];
    } else {
      this.isCheckOutDisabled = true;
      this.minCheckOutDate = '';
    }
  }
}
