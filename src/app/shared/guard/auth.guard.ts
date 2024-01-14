import {
  Router,
  type CanActivateChildFn,
  type CanMatchFn,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const isAuthenticated = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) return true;

  router.navigate(['login']);
  return false;
};

export const authGuardCanMatch: CanMatchFn = isAuthenticated;
export const authGuardCanActivate: CanActivateChildFn = isAuthenticated;
