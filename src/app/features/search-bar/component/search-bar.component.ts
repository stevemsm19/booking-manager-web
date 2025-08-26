import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ButtonComponent } from '../../../shared/components/buttom/button.component';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { priceRangeValidator } from '../../../shared/utils/validators/price-range';
import { ValidationService } from '../../../core/services/validation.service';
import { HotelFiltersService } from '../../hotels/services/hotel-filters.service';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule, ButtonComponent, InputFieldComponent],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  form: FormGroup;
  submitted = false;

  minCheckInInput = new Date().toISOString().split('T')[0];
  minCheckOutInput = '';
  minPriceInput = 10;
  maxPriceInput = 100000;
  minTravelersInput = 1;
  maxTravelersInput = 16;

  constructor(private fb: FormBuilder, private filtersService: HotelFiltersService) {
    this.form = this.fb.group(
      {
        location: [''],
        checkIn: [''],
        checkOut: [{ value: '', disabled: true }],
        numberOfGuests: [
          '',
          [
            Validators.min(this.minTravelersInput),
            Validators.max(this.maxTravelersInput),
          ],
        ],
        minPrice: [
          '',
          [
            Validators.min(this.minPriceInput),
            Validators.max(this.maxPriceInput),
          ],
        ],
        maxPrice: [
          '',
          [
            Validators.min(this.minPriceInput),
            Validators.max(this.maxPriceInput),
          ],
        ],
      },
      { validators: priceRangeValidator }
    );
  }

  getControl(name: string) {
    return this.form.get(name) as FormControl;
  }

  updateCheckOutMinDate() {
    const checkIn = this.getControl('checkIn')?.value;
    if (checkIn) {
      const checkInDate = new Date(checkIn);
      checkInDate.setDate(checkInDate.getDate() + 1);
      this.minCheckOutInput = checkInDate.toISOString().split('T')[0];
      this.getControl('checkOut')?.enable();
    } else {
      this.minCheckOutInput = '';
      this.getControl('checkOut')?.disable();
      this.getControl('checkOut')?.reset();
    }
  }

  onSearch() {
    this.submitted = true;

    if (this.form.invalid) {
      const messageError = ValidationService.getFormErrorMessage(
        this.form,
        this.submitted
      );
      this.clearFilters();
      return alert(messageError);
    }

    if (this.form.valid) {
      const filters = {
        ...this.form.getRawValue(),
        page: 1,
        size: 10,
      };
      this.filtersService.setFilters(filters);
    }
  }

  clearFilters() {
    this.form.reset({
      location: '',
      checkIn: '',
      checkOut: '',
      numberOfGuests: '',
      minPrice: '',
      maxPrice: '',
    });
    this.form.get('checkOut')?.disable();
    this.onSearch();
  }
}
