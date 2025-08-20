import { Component, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { Router } from '@angular/router';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field';
import { ValidationService } from '../../../services/validation-service';
import { Alert } from '../../../../shared/components/alert/alert';
import { ButtonComponent } from "../../../../shared/components/buttom/button";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputFieldComponent, Alert, ButtonComponent],
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  formError = signal<string>('');

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  getControl(name: string) {
    return this.loginForm.get(name) as FormControl;
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

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.formError.set(err.error.details);

        setTimeout(() => {
          this.formError.set('');
        }, 2000);
      },
    });
  }
}
