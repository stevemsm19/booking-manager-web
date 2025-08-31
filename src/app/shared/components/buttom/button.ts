import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrls: ['./button.scss'],
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() color: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled = false;
  @Output() onClick = new EventEmitter<Event>();
}
