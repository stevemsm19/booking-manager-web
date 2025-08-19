import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';
import { InputFieldComponent } from '../../../../shared/components/input-field/input-field';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputFieldComponent],
  template: `
    <div class="login-container">
      <h1 class="heading-title leading">Sign in</h1>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
        <app-input-field
          label="Email"
          type="email"
          placeholder="Enter your email"
          [required]="true"
          [control]="getControl('email')"
          [error]="getEmailErrorMessage()"
        />

        <app-input-field
          label="Password"
          type="password"
          placeholder="Enter your password"
          [required]="true"
          [control]="getControl('password')"
          [error]="getPasswordErrorMessage()"
        />

        <button type="submit">Login</button>

        @if(loginError){
          <div class="error-message" style="color: red;">{{ loginError }}</div>
        }

        <span class="auth-footer">
          Don't have an account? <a href="/register">Sign up</a>
        </span>
      </form>
    </div>
  `,
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
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
    const emailControl = this.getControl('email');
    if (
      emailControl &&
      (emailControl?.touched || emailControl?.dirty || this.submitted == true)
    ) {
      if (emailControl.hasError('required')) {
        return 'Email is required.';
      }

      if (emailControl.hasError('email')) {
        return 'Please enter a valid email address.';
      }
    }
    return '';
  }

  getPasswordErrorMessage(): string {
    const passwordControl = this.getControl('password');
    if (
      passwordControl &&
      (passwordControl?.touched ||
        passwordControl?.dirty ||
        this.submitted == true)
    ) {
      if (passwordControl.hasError('required')) {
        return 'Password is required.';
      }
    }
    return '';
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loginError = err.error.details;
      },
    });
  }
}
