import { Component, inject } from '@angular/core';
import { HotelDataService } from '../../service/hotels-data';
import { HotelCard } from '../../components/card-item/hotel-card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotels-list',
  imports: [HotelCard, CommonModule],
  template: `
    <div class="cards">
      @for (hotelItem of hotels$ | async; track hotelItem._id) {
      <app-hotel-card
        [hotel]="hotelItem"
        (cardClicked)="handleCardClick($event)"
      ></app-hotel-card>
      }
    </div>
  `,
  styleUrl: './hotels-list.scss',
})
export class HotelsList {
  private configService = inject(HotelDataService);
  
  hotels$ = this.configService.getHotels();

  handleCardClick(hotelId: string) {
    console.log('Card clicked with hotel ID:', hotelId);
  }
}
