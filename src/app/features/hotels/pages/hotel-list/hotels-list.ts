import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Hotel } from '../../interfaces/hotel-interface';
import { HotelService } from '../../services/hotel-services';
import { HotelCard } from '../../components/card-item/hotel-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotels-list',
  standalone: true,
  imports: [CommonModule, HotelCard],
  template: `
    <div>
      @if (hotels$) {
        <div class="cards">
          @for (hotelItem of hotels$ | async; track hotelItem._id) {
            <app-hotel-card
              [hotel]="hotelItem"
              (cardClicked)="handleCardClick($event)"
            ></app-hotel-card>
          }
        </div>
      } 
      @else {
        <div class="no-hotels-banner">
          <h3>No Hotels Found</h3>
          <p>Sorry, we couldn't find any hotels matching your criteria.</p>
        </div>
      }
    </div>
  `,
  styleUrl: './hotels-list.scss',
})
export class HotelsList implements OnInit {
  @Input() filters: any = {};
  hotels$!: Observable<Hotel[]>;
  private hotelService = inject(HotelService);

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.fetchHotels();
  }

  ngOnChanges(): void {
    this.fetchHotels();
  }

  handleCardClick(hotelId: string) {
    this.router.navigate([`/book/stay/${hotelId}`]); 
  }

  fetchHotels() {
    this.hotels$ = this.hotelService.getHotels(this.filters);
  }
}
