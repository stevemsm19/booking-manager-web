import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

import { Hotel } from '../../models/hotel.model';

import { CardComponent } from "../../../../shared/components/card/card";

// Todo: implement filter listen to show or not the prices
@Component({
  selector: 'app-hotel-card',
  imports: [CurrencyPipe, CardComponent],
  templateUrl: './hotel-card.html',
  styleUrls: ['./hotel-card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelCard {
  @Input() hotel!: Hotel;
  @Output() cardClicked = new EventEmitter<string>();

  onCardClick() {
    this.cardClicked.emit(this.hotel._id);
  }
}
