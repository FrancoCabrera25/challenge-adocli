import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { LoginRequest } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private EMAIL_DEMO = 'user@demo.com';
  private PASSWORD_DEMO = '123456';

  login({ email, password }: LoginRequest): Observable<boolean> {
    if (
      email.trim().toLowerCase() === this.EMAIL_DEMO &&
      password.trim().toLowerCase() === this.PASSWORD_DEMO
    ) {
      return of(true);
    }

    return throwError(() => 'Email/password incorrecto');
  }
}
