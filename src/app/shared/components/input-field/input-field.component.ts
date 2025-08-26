import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
})
export class InputFieldComponent {
  @Input() label? = '';
  @Input() type?: 'text' | 'password' | 'email' | 'number' | 'date' = 'text';
  @Input() placeholder? = '';
  @Input() control: FormControl = new FormControl();
  @Input() required = false;
  @Input() error: string = '';
  @Input() disabled: boolean = false;
  @Input() min: number | string = '';
  @Input() max: number | string = '';
}
