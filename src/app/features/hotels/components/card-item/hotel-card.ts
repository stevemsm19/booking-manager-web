import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from '../../interfaces/hotel-interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-hotel-card',
  imports: [CurrencyPipe],
  template: `
    <div class="card" (click)="onCardClick()">
      <img [src]="hotel.images" alt="{{ hotel.title }}" class="card-image" />
      <div class="card-content">
        <h3>{{ hotel.title }}</h3>
        <p>{{ hotel.location }} ⭐ {{ hotel.rating }}</p>
        <div class="price">
          <span class="price-value">{{ hotel.price | currency : 'USD' }}</span>
          <span class="price-label">por noche</span>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./hotel-card.scss'],
})
export class HotelCard {
  @Input() hotel!: Hotel;
  @Output() cardClicked = new EventEmitter<string>();

  constructor(private router: Router) {}

  onCardClick() {
    this.cardClicked.emit(this.hotel._id);
    this.router.navigate([`/hotel/${this.hotel._id}`]);
  }
}
