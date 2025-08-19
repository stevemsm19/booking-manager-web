import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  imports: [FormsModule, ReactiveFormsModule],
  template: `
    <div class="field">
      <label>
        {{ label }}
        @if(required) {
        <span class="required">*</span>
        }
      </label>

      <input
        [type]="type"
        [placeholder]="placeholder"
        [required]="required"
        [formControl]="control"
        [class.error]="error"
      />

      <div class="error-message">
        @if(error) {
          {{ error }}
        }
      </div>
    </div>
  `,
  styleUrls: ['./input-field.scss'],
  standalone: true,
})
export class InputFieldComponent {
  @Input() label? = '';
  @Input() type?: 'text' | 'password' | 'email' | 'number' = 'text';
  @Input() placeholder? = '';
  @Input() control: FormControl = new FormControl();
  @Input() required = false;
  @Input() error: string = '';
}
