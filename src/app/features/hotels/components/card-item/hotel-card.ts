import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hotel } from '../../models/hotel-model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-hotel-card',
  imports: [CurrencyPipe],
  templateUrl: './hote-card.html',
  styleUrls: ['./hotel-card.scss'],
})
export class HotelCard {
  @Input() hotel!: Hotel;
  @Output() cardClicked = new EventEmitter<string>();

  onCardClick() {
    this.cardClicked.emit(this.hotel._id);
  }
}
