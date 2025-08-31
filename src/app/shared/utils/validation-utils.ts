import { AbstractControl, FormGroup } from '@angular/forms';

import { VALIDATION_MESSAGES } from '../../core/constants/validations-constants';

export class ValidationUtils {
  static shouldShowErrors(control: AbstractControl | null, submitted: boolean): boolean {
    if (!control) return false;
    return (control.invalid && (control.touched || control.dirty || submitted));
  }

  static getControlErrorMessage(control: AbstractControl | null, submitted: boolean, field?: string): string {
    if (!control || !this.shouldShowErrors(control, submitted)) {
      return '';
    }

    const errors = control.errors;
    if (!errors) return '';

    const fieldName = field || 'This field';

    if (errors['required']) return VALIDATION_MESSAGES.REQUIRED;
    if (errors['email']) return VALIDATION_MESSAGES.EMAIL_INVALID;

    if (errors['minlength']) return VALIDATION_MESSAGES.MIN_LENGTH(fieldName, errors['minlength'].requiredLength);
    if (errors['maxlength']) return VALIDATION_MESSAGES.MAX_LENGTH(fieldName, errors['maxlength'].requiredLength);
    
    if (errors['min']) return VALIDATION_MESSAGES.MIN_VALUE(fieldName, errors['min'].min);
    if (errors['max']) return VALIDATION_MESSAGES.MAX_VALUE(fieldName, errors['max'].max);

    return VALIDATION_MESSAGES.GENERIC_ERROR;
  }

  static getFormErrorMessage(form: FormGroup): string {
  
    if (form.errors) {
      if (form.errors['passwordMismatch']) {
        return VALIDATION_MESSAGES.PASSWORDS_DONT_MATCH;
      }
      if (form.errors['priceRange']) {
        return VALIDATION_MESSAGES.PRICE_RANGE_INVALID;
      }
    }

    for (const fieldName of Object.keys(form.controls)) {
      const control = form.get(fieldName);
      if (this.shouldShowErrors(control,true)) {
        return this.getControlErrorMessage(control, true, fieldName);
      }
    }

    return VALIDATION_MESSAGES.GENERIC_ERROR;
  }
}