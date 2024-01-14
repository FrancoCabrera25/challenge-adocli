import { inject } from '@angular/core';
import {
  Router,
  type CanActivateChildFn,
  type CanMatchFn,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const loginGuard: CanMatchFn = (route, segments) => {
  return true;
};
export const isAuthenticated = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    router.navigate(['product-list']);
  }

  return true;
};

export const loginGuardCanMatch: CanMatchFn = isAuthenticated;
export const loginGuardCanActivate: CanActivateChildFn = isAuthenticated;
