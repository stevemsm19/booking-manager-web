import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Room } from '../../models/hotel-booking.model';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.scss'],
  imports: [CardComponent, CurrencyPipe],
})
export class RoomCardComponent {
  @Input() room!: Room;
  @Output() quantityChange = new EventEmitter<Room>();

  onRoomQuantityChange(amount: number) {
    const newValue = this.room.selectedQuantity + amount;
    if (newValue >= 0) {
      this.room.selectedQuantity = newValue;
      this.quantityChange.emit(this.room);
    }
  }
}
