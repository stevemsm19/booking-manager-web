import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hotel } from '../../models/hotel.model';
import { CurrencyPipe } from '@angular/common';
import { CardComponent } from "../../../../shared/components/card/card.component";

@Component({
  selector: 'app-hotel-card',
  imports: [CurrencyPipe, CardComponent],
  templateUrl: './hote-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
})
export class HotelCard {
  @Input() hotel!: Hotel;
  @Output() cardClicked = new EventEmitter<string>();

  onCardClick() {
    this.cardClicked.emit(this.hotel._id);
  }
}
