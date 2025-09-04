import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Room } from '../../models/hotel-details.model';
import { CardComponent } from '../../../../shared/components/card/card';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-room-card',
  templateUrl: './room-card.html',
  styleUrls: ['./room-card.scss'],
  imports: [CardComponent, CurrencyPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoomCardComponent {
  @Input() room!: Room;
  @Output() quantityChange = new EventEmitter<Room>();

  onRoomQuantityChange(amount: number) {
    const newValue = this.room.selectedQuantity + amount;
    if (newValue >= 0 && newValue <= 1) {
      this.room.selectedQuantity = newValue;
      this.quantityChange.emit(this.room);
    }
  }
}
