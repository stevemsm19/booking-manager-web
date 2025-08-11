import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Output() cardClicked = new EventEmitter<string>();
  
  onCardClick() {
    this.cardClicked.emit(this.hotel._id);
  }
  
}

export interface Hotel {
   _id: string;
  image: string[];
  title: string;
  location: string;
  rating: number;
}

