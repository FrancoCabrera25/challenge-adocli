import { Injectable, computed, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LoginRequest } from '../../interface/user.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public readonly EMAIL_DEMO = 'user@demo.com';
  public readonly PASSWORD_DEMO = '123456';
  public isAuthenticated = computed<boolean>(() => this.isLogged());
  private isLogged = signal<boolean>(false);

  constructor(private router: Router) {
    if (localStorage.getItem('token')) {
      this.isLogged.set(true);
    }
  }

  login({ email, password }: LoginRequest): Observable<boolean> {
    if (
      email.trim().toLowerCase() === this.EMAIL_DEMO &&
      password.trim().toLowerCase() === this.PASSWORD_DEMO
    ) {
      this.isLogged.set(true);
      localStorage.setItem('token', this.getToken());
      return of(true);
    }

    return throwError(() => 'Email/password incorrecto');
  }

  logout(): void {
    this.isLogged.set(false);
    localStorage.clear();
    this.router.navigate(['login']);
  }

  getToken(): string {
    return 'ASDASDASDASDASDASDASD';
  }
}
