import { Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { FIELD_NAMES } from '../../../../core/constants/validations-constants';
import { FiltersService } from '../../../../core/services/filters.service';

import { SearchBarForm } from '../../models/search-bar.model';

import { ButtonComponent } from '../../../../shared/components/buttom/button';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field';
import { ValidationUtils } from '../../../../shared/utils/validation-utils';
import { priceRangeValidator } from '../../../../shared/validators/price-range';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule, ButtonComponent, InputFieldComponent],
  templateUrl: './search-bar.html',
  styleUrls: ['./search-bar.scss'],
})
export class SearchBarComponent {
  readonly submitted = signal(false);

  readonly searchForm: FormGroup<SearchBarForm>;

  readonly minCheckInInput = new Date().toISOString().split('T')[0];
  readonly minPriceInput = 10;
  readonly maxPriceInput = 100000;
  readonly minTravelersInput = 1;
  readonly maxTravelersInput = 16;

  minCheckOutInput = signal<string>('');

  constructor(
    private readonly fb: FormBuilder,
    private readonly filtersService: FiltersService
  ) {
    this.searchForm = this.fb.group(
      {
        [FIELD_NAMES.LOCATION]: this.fb.control('', {
          nonNullable: true,
        }),
        [FIELD_NAMES.CHECK_IN]: this.fb.control('', {
          nonNullable: true,
        }),
        [FIELD_NAMES.CHECK_OUT]: this.fb.control(
          { value: '', disabled: true },
          { nonNullable: true }
        ),
        [FIELD_NAMES.NUMBER_OF_GUESTS]: this.fb.control('', {
          nonNullable: true,
          validators: [
            Validators.min(this.minTravelersInput),
            Validators.max(this.maxTravelersInput),
          ],
        }),
        [FIELD_NAMES.MIN_PRICE]: this.fb.control('', {
          nonNullable: true,
          validators: [
            Validators.min(this.minPriceInput),
            Validators.max(this.maxPriceInput),
          ],
        }),
        [FIELD_NAMES.MAX_PRICE]: this.fb.control('', {
          nonNullable: true,
          validators: [
            Validators.min(this.minPriceInput),
            Validators.max(this.maxPriceInput),
          ],
        }),
      },
      { validators: priceRangeValidator }
    );
  }

  onSearch(): void {
    this.submitted.set(true);

    if (this.searchForm.invalid) {
      const messageError = ValidationUtils.getFormErrorMessage(this.searchForm);
      this.clearFilters();
      return alert(messageError);
    }
    
    this.performSearch();
  }

  getControl(name: string): FormControl {
    return this.searchForm.get(name) as FormControl;
  }

  updateCheckOutMinDate(): void {
    const checkInValue = this.getControl('checkIn')?.value;

    if (checkInValue) {
      const checkInDate = new Date(checkInValue);
      checkInDate.setDate(checkInDate.getDate() + 1);
      this.minCheckOutInput.set(checkInDate.toISOString().split('T')[0]);
      this.getControl('checkOut')?.enable();
    } else {
      this.minCheckOutInput.set('');
      this.getControl('checkOut')?.disable();
      this.getControl('checkOut')?.reset();
    }
  }
  
  clearFilters(): void {
    this.searchForm.reset({
      location: '',
      checkIn: '',
      checkOut: '',
      numberOfGuests: '',
      minPrice: '',
      maxPrice: '',
    });

    this.getControl('checkOut')?.disable();
    this.submitted.set(false);
  }

  private performSearch(): void {
    if (this.searchForm.valid) {
      const filters = {
        ...this.searchForm.getRawValue(),
        page: 1,
        size: 10,
      };
      this.filtersService.setFilters(filters);
    }
  }
}
