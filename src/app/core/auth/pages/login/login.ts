import { Component } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
  template: `
    <div class="login-container">
      <h1 class="heading-title leading">Sign in</h1>
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="login-form">
        <label>Email</label>
        <input
          type="email"
          formControlName="email"
          placeholder="Enter your email"
        />
        <div class="error">{{ getEmailErrorMessage() }}</div>

        <label>Password</label>
        <input
          type="password"
          formControlName="password"
          placeholder="Enter your password"
        />
        <div class="error">{{ getPasswordErrorMessage() }}</div>
        <button type="submit">Login</button>
        <span class="auth-footer">
          Don't have an account? <a href="/register">Sign up</a>
        </span>
      </form>
    </div>
  `,
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  submitted = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  getEmailErrorMessage(): string {
    const emailControl = this.email;
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
    const passwordControl = this.password;
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
  }
}
