import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { HotelApiResponse } from '../../models/hotel.model';
import { HotelService } from '../../services/hotel.service';
import { HotelCard } from '../../components/hotel-item/hotel-card.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HotelFiltersService } from '../../services/hotel-filters.service';
import { Filters } from '../../../search-bar/models/filters.model';

@Component({
  selector: 'app-hotels-list',
  imports: [CommonModule, HotelCard, AsyncPipe],
  templateUrl: './hotel-list.html',
  styleUrl: './hotels-list.scss',
})
export class HotelsList implements OnInit {

  hotels$!: Observable<HotelApiResponse[]>;
  loading = true;

  constructor(private hotelService: HotelService, private router: Router, private filtersService: HotelFiltersService) {}

  ngOnInit() {
    this.filtersService.filters$.subscribe((filters) => {
      this.fetchHotels(filters);
    });
  }

  fetchHotels(filters: Filters) {
    this.hotels$ = this.hotelService.getHotels(filters);
    this.loading = false;
  }

  handleCardClick(hotelId: string) {
    this.router.navigate(['/book/stay', hotelId]);
  }
}
