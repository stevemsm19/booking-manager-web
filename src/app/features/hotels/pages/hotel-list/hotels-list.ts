import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hotel } from '../../models/hotel-model';
import { HotelService } from '../../../services/hotel-services';
import { HotelCard } from '../../components/card-item/hotel-card';
import { Router } from '@angular/router';
import { Alert } from "../../../../shared/components/alert/alert";

@Component({
  selector: 'app-hotels-list',
  imports: [CommonModule, HotelCard, Alert],
  templateUrl: './hotel-list.html',
  styleUrl: './hotels-list.scss',
})
export class HotelsList implements OnInit {
  @Input() filters: any = {};
  @Input() messageError: string = '';

  hotels = signal<Hotel[]>([]);
  loading = signal(true);

  constructor(
    private hotelService: HotelService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.fetchHotels();
  }

  ngOnChanges(): void {
    this.fetchHotels();
  }

  fetchHotels() {
    this.hotelService.getHotels(this.filters).subscribe({
      next: (res: Hotel[]) => {
        this.hotels.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error fetching hotels:', err);
        this.loading.set(false);
      },
    });
  }

  handleCardClick(hotelId: string) {
    this.router.navigate(['/book/stay', hotelId]);
  }

}
