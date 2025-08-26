import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss',
})
export class Alert {
  @Input() type: 'success' | 'error' = 'success';
  @Input() message = '';
}
