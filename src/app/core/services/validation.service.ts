import { AbstractControl, FormGroup } from '@angular/forms';

export class ValidationService {
  static shouldShowErrors(
    control: AbstractControl | null,
    submitted: boolean
  ): boolean {
    if (!control) return false;
    return control.touched || control.dirty || submitted;
  }

  static getFieldErrorMessage(
    control: AbstractControl,
    submitted = false,
    field?: string
  ): string {
    if (!control || !this.shouldShowErrors(control, submitted)) return '';

    const errors = control.errors;
    if (!errors) return '';

    const fieldName = field || 'This field';

    const errorMessages: Record<string, string> = {
      email: 'Please enter a valid email.',
      passwordMismatch: 'Passwords do not match.',
      maxPriceLessThanMin: 'Max price should be greater than or equal to min price.',

      required: `${fieldName} is required.`,
      min: `${fieldName} must be at least ${errors['min']?.min}`,
      max: `${fieldName} cannot exceed ${errors['max']?.max}`,
      minlength: `${fieldName} must be at least ${errors['minlength']?.requiredLength} characters.`,
      maxlength: `${fieldName} cannot exceed ${errors['maxlength']?.requiredLength} characters.`,
      pattern: `${fieldName} has invalid format.`,
    };

    const firstErrorKey = Object.keys(errors)[0];
    return errorMessages[firstErrorKey] || 'Invalid field.';
  }

  static getFormErrorMessage(form: FormGroup, submitted: boolean): string {
    if (form.errors) {
      return this.getFieldErrorMessage(form, submitted);
    }

    for (const fieldName of Object.keys(form.controls)) {
      const control = form.get(fieldName);
      if (
        control &&
        this.shouldShowErrors(control, submitted) &&
        control.invalid
      ) {
        return this.getFieldErrorMessage(control, submitted, fieldName);
      }
    }
    return '';
  }
}
