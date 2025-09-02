import { Component, signal } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { LoginForm } from "./login.model";
import { AuthService } from "../../services/auth.service";
import { FIELD_NAMES } from "../../constants/validations-constants";

import { ValidationUtils } from "../../../shared/utils/validation-utils";
import { InputFieldComponent } from "../../../shared/components/input-field/input-field";
import { ButtonComponent } from "../../../shared/components/buttom/button";
import { Alert } from "../../../shared/components/alert/alert";
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputFieldComponent, ButtonComponent, Alert],
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  readonly submitted = signal(false);
  readonly formError = signal('');

  readonly loginForm: FormGroup<LoginForm>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.loginForm = this.fb.group({
      [FIELD_NAMES.EMAIL]: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      [FIELD_NAMES.PASSWORD]: this.fb.control('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  getControl(name: string) {
    return this.loginForm.get(name) as FormControl;
  }

  getEmailError(): string {
    return ValidationUtils.getControlErrorMessage(
      this.loginForm.get(FIELD_NAMES.EMAIL),
      this.submitted()
    );
  }

  getPasswordError(): string {
    return ValidationUtils.getControlErrorMessage(
      this.loginForm.get(FIELD_NAMES.PASSWORD),
      this.submitted()
    );
  }

  onChange(): void {
    this.clearFormError();
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.loginForm.invalid) return;

    this.performLogin();
  }

  private performLogin(): void {
    const { email, password } = this.loginForm.getRawValue();

    this.authService.login(email, password).subscribe({
      next: () => {
        this.handleLoginSuccess();
      },
      error: (error) => {
        this.handleLoginError(error);
      },
    });
  }

  private handleLoginSuccess(): void {
    this.router.navigate(['/']);
  }

  private handleLoginError(error: any): void {

    const errorMessage =
      error?.error?.details || 'Error logging in. Please try again.';

    this.formError.set(errorMessage);
  }

  private clearFormError() {
    this.formError.set('')
  }
}
