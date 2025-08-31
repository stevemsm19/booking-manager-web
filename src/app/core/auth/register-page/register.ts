import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { FIELD_NAMES } from '../../constants/validations-constants';
import { RegisterForm } from './register.model';

import { InputFieldComponent } from '../../../shared/components/input-field/input-field';
import { Alert } from '../../../shared/components/alert/alert';
import { ButtonComponent } from '../../../shared/components/buttom/button';
import { ValidationUtils } from '../../../shared/utils/validation-utils';
import { PasswordMatchValidator } from '../../../shared/validators/password-match';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputFieldComponent, Alert, ButtonComponent],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  readonly submitted = signal(false);
  readonly formError = signal<string>('');
  readonly formMessage = signal<string>('');
  readonly isLoading = signal(false);

  readonly registerForm: FormGroup<RegisterForm>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        [FIELD_NAMES.EMAIL]: this.fb.control('', {
          nonNullable: true,
          validators: [Validators.required, Validators.email],
        }),
        [FIELD_NAMES.PASSWORD]: this.fb.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
        [FIELD_NAMES.CONFIRM_PASSWORD]: this.fb.control('', {
          nonNullable: true,
          validators: [Validators.required],
        }),
      },
      { validators: PasswordMatchValidator }
    );
  }

  getControl(name: string): FormControl {
    return this.registerForm.get(name) as FormControl;
  }

  getEmailError(): string {
    return ValidationUtils.getControlErrorMessage(
      this.registerForm.get(FIELD_NAMES.EMAIL),
      this.submitted()
    );
  }

  getPasswordError(): string {
    return ValidationUtils.getControlErrorMessage(
      this.registerForm.get(FIELD_NAMES.PASSWORD),
      this.submitted()
    );
  }

  getConfirmPasswordError(): string {
    return ValidationUtils.getControlErrorMessage(
      this.registerForm.get(FIELD_NAMES.CONFIRM_PASSWORD),
      this.submitted()
    );
  }

  onChange(): void {
    this.clearFormError();
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.registerForm.invalid) {
      const errorMessage = ValidationUtils.getFormErrorMessage(this.registerForm);
      return this.formError.set(errorMessage);
    }

    this.performRegister();
  }

  private performRegister(): void {
    const { email, password } = this.registerForm.getRawValue();

    this.isLoading.set(true);
    this.clearFormError();

    this.authService.register(email, password).subscribe({
      next: () => {
        this.handleRegisterSuccess();
      },
      error: (error) => {
        this.handleRegisterError(error);
      },
    });
  }

  private handleRegisterSuccess(): void {
    this.isLoading.set(false);
    this.clearFormError();
    this.formMessage.set('User successfully registered. Redirecting......');

    setTimeout(() => {
      this.formMessage.set('');
      this.router.navigate(['/auth/login']);
    }, 1500);
  }

  private handleRegisterError(error: any): void {
    this.isLoading.set(false);
    this.clearFormMessage();

    const errorMessage = error?.error?.details || 'Error registering user. Please try again.';

    this.formError.set(errorMessage);
  }

  private clearFormError(): void {
    this.formError.set('');
  }

  private clearFormMessage(): void {
    this.formMessage.set('');
  }
}
