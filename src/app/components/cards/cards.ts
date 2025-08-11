import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Data } from '../../services/data';
import { CardItem } from './card-item/card-item';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule, CardItem],
  templateUrl: './cards.html',
  styleUrl: './cards.scss'
})
export class Cards implements OnInit {
  hotels: any[] = [];

  constructor(private dataService: Data) {}

  ngOnInit() {
    this.dataService.getHotels().subscribe((res: any) => {
      this.hotels = res.content.map((h: any) => ({
        _id: String(h._id),
        image: h.images && h.images.length > 0 ? h.images[0] : 'assets/no-image.png',
        title: h.title,
        location: h.location,
        rating: h.rating
      }));
    });
  }

}
