import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-item.html',
  styleUrl: './card-item.scss'
})
export class CardItem {
  @Input() hotel!: Hotel;
  
  onCardClick() {
    console.log(this.hotel._id);
  }
  
}

export interface Hotel {
   _id: string;
  image: string[];
  title: string;
  location: string;
  rating: number;
}

