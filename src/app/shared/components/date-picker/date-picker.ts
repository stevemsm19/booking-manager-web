import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="datepicker-container">
      <mat-form-field>
        <mat-label>Enter a date range</mat-label>
        <mat-date-range-input
          [formGroup]="range"
          [rangePicker]="picker"
          [min]="minDate"
        >
          <input matStartDate formControlName="start" placeholder="Check-in" />
          <input
            matEndDate
            formControlName="end"
            placeholder="Check-out"
            (dateInput)="onEndDateChange()"
          />
        </mat-date-range-input>
        <mat-datepicker-toggle
          matIconSuffix
          [for]="picker"
        ></mat-datepicker-toggle>
        <mat-date-range-picker #picker></mat-date-range-picker>

        @if (range.controls.start.hasError('matStartDateInvalid')) {
        <mat-error>Invalid start date</mat-error>
        } @if (range.controls.end.hasError('matEndDateInvalid')) {
        <mat-error>Invalid end date</mat-error>
        } @if (range.controls.end.hasError('sameDates')) {
        <mat-error>Minimim 1 night</mat-error>
        }
      </mat-form-field>
    </div>
  `,
  styleUrl: './date-picker.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePicker {
  minDate = new Date();

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  onEndDateChange() {
    const startDate = this.range.value.start;
    const endDate = this.range.value.end;

    if (startDate && endDate && endDate.getTime() === startDate.getTime()) {
      this.range.controls.end.setErrors({ sameDates: true });
    }
  }
}
