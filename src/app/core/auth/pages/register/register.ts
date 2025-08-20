import { Component, signal } from '@angular/core';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { ValidationService } from '../../../services/validation-service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { PasswordMatchValidator } from '../../../../shared/utils/validators/password-match';
import { Alert } from '../../../../shared/components/alert/alert';
import { ButtonComponent } from "../../../../shared/components/buttom/button";

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputFieldComponent, Alert, ButtonComponent],
  templateUrl: './register.html',
  styleUrls: ['./register.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  formError = signal<string>('');
  formMessage = signal<string>('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: PasswordMatchValidator }
    );
  }

  getControl(name: string) {
    return this.registerForm.get(name) as FormControl;
  }

  getEmailErrorMessage(): string {
    return ValidationService.getErrorMessage(
      this.getControl('email'),
      'Email',
      this.submitted
    );
  }

  getPasswordErrorMessage(): string {
    return ValidationService.getErrorMessage(
      this.getControl('password'),
      'Password',
      this.submitted
    );
  }

  getConfirmPasswordErrorMessage(): string {
    const confirmError = ValidationService.getErrorMessage(
      this.getControl('confirmPassword'),
      'Confirm password',
      this.submitted
    );
    if (confirmError) return confirmError;

    if (this.registerForm.hasError('passwordMismatch')) {
      return 'Passwords do not match';
    }

    return '';
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) return;

    const { email, password } = this.registerForm.value;

    this.authService.register(email, password).subscribe({
      next: () => {
        this.formError.set('');
        this.formMessage.set('User successfully registered. Redirecting...');

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },
      error: (err) => {
        this.formError.set(err.error.details);
        setTimeout(() => {
          this.formError.set('');
        }, 100000);
      },
    });
  }
}
