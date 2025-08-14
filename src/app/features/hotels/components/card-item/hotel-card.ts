import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from '../../interfaces/hotel-interface';

@Component({
  selector: 'app-hotel-card',
  imports: [],
  template: `
    <div class="card" (click)="onCardClick()">
      <img [src]="hotel.image" alt="{{ hotel.title }}" class="card-image" />
      <div class="card-content">
        <h3>{{ hotel.title }}</h3>
        <p>{{ hotel.location }} ⭐ {{ hotel.rating }}</p>
      </div>
    </div>
  `,
  styleUrl: './hotel-card.scss',
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