import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  @Input() type: 'success' | 'error' = 'success';
  @Input() message = '';
}
