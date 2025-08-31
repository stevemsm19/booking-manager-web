import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { Filters } from '../../../../core/models/filter.model';
import { FiltersService } from '../../../../core/services/filters.service';

import { HotelService } from '../../services/hotel.service';
import { HotelApiResponse } from '../../models/hotel.model';
import { HotelCard } from '../hotel-card/hotel-card';

@Component({
  selector: 'app-hotels-list',
  imports: [CommonModule, HotelCard],
  templateUrl: './hotel-list.html',
  styleUrl: './hotels-list.scss',
})
export class HotelsList {

  readonly hotels = signal<HotelApiResponse[] | null>(null);
  readonly loading = signal(true);

  constructor(private hotelService: HotelService, private router: Router, private filtersService: FiltersService) {
    effect(() => {
      const filters = this.filtersService.filters();
      this.fetchHotels(filters);
    });
  }

  private fetchHotels(filters: Filters): void {
    this.loading.set(true);

    this.hotelService.getHotels(filters).subscribe({
      next: (hotels) => {
        this.hotels.set(hotels);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        console.error('Error fetching hotels:', error);
      }
    });
  }

  handleCardClick(hotelId: string): void {
    this.router.navigate(['/book/stay', hotelId]);
  }
}