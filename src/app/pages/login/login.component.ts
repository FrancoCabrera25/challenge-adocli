import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../shared/services/auth/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  title = 'app';
  public hide = false;
  public errorLogin?: string;
  public form: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  get formValues() {
    return this.form.value;
  }

  get emailDemo(): string {
    return this.authService.EMAIL_DEMO;
  }
  get passwordDemo(): string {
    return this.authService.PASSWORD_DEMO;
  }

  isValidField(field: string): boolean | null {
    return (
      this.form.controls[field].errors && this.form.controls[field].touched
    );
  }
  getFieldError(field: string): string | null {
    if (!this.form.controls[field]) return null;

    const errors = this.form.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'minlength':
          return `Este campo requiere minimo ${errors['minlength'].requiredLength} caracteres`;
        case 'required':
          return 'Este campo es requerido';
        case 'email':
          return 'El email invalido';
      }
    }

    return null;
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.authService
        .login(this.formValues)
        .pipe()
        .subscribe({
          next: () => {
            this.router.navigate(['product-list']);
          },
          error: (error) => {
            this.errorLogin = error;
          },
        });
    }
  }
}
