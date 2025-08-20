import { AbstractControl } from '@angular/forms';

export class ValidationService {
  static shouldShowErrors(
    control: AbstractControl | null,
    submitted: boolean
  ): boolean {
    if (!control) return false;
    return control.touched || control.dirty || submitted;
  }

  static getErrorMessage(
    control: AbstractControl,
    fieldName: string,
    submitted = false,
  ): string {
    if (!control || !this.shouldShowErrors(control, submitted)) return '';

    const errors = control.errors;
    if (!errors) return '';

    const errorMessages: Record<string, string> = {
      email: 'Please enter a valid email.',
      passwordMismatch: 'Passwords do not match.',
      required: `${fieldName} is required.`,
      minlength: `${fieldName} must be at least ${errors['minlength']?.requiredLength} characters.`,
      maxlength: `${fieldName} cannot exceed ${errors['maxlength']?.requiredLength} characters.`,
      pattern: `${fieldName} has invalid format.`,
    };

    const firstErrorKey = Object.keys(errors)[0];
    return errorMessages[firstErrorKey] || 'Invalid field.';
  }
}
