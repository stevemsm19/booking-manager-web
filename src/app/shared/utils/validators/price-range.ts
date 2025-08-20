import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const priceRangeValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const minPrice = control.get('minPrice')?.value;
  const maxPrice = control.get('maxPrice')?.value;

  if (minPrice !== '' && maxPrice !== '' && maxPrice < minPrice) {
    return { maxPriceLessThanMin: true }
  }
  return null;
}
