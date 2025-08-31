import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Hotel } from '../../models/hotel.model';

import { CardComponent } from "../../../../shared/components/card/card";

@Component({
  selector: 'app-hotel-card',
  imports: [CurrencyPipe, CardComponent],
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
