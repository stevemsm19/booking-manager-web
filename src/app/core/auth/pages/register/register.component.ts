import { Component, signal } from '@angular/core';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ValidationService } from '../../../services/validation.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { PasswordMatchValidator } from '../../../../shared/utils/validators/password-match';
import { Alert } from '../../../../shared/components/alert/alert.component';
import { ButtonComponent } from '../../../../shared/components/buttom/button.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, InputFieldComponent, Alert, ButtonComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
    return ValidationService.getFieldErrorMessage(
      this.getControl('email'),
      this.submitted,
      'Email'
    );
  }

  getPasswordErrorMessage(): string {
    return ValidationService.getFieldErrorMessage(
      this.getControl('password'),
      this.submitted,
      'Password'
    );
  }

  getConfirmPasswordErrorMessage(): string {
    return ValidationService.getFieldErrorMessage(
      this.getControl('confirmPassword'),
      this.submitted,
      'Confirm password'
    );
  }

  onChange() {
    this.formError.set('');
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return this.formError.set(
        ValidationService.getFieldErrorMessage(this.registerForm, this.submitted)
      );
    }

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
