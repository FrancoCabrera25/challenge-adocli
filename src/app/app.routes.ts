import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';
import {
  authGuardCanActivate,
  authGuardCanMatch,
} from './shared/guard/auth.guard';
import {
  loginGuardCanActivate,
  loginGuardCanMatch,
} from './shared/guard/login.guard';

export const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login',
    canActivate: [loginGuardCanActivate],
    canMatch: [loginGuardCanMatch],
  },
  {
    component: ProductComponent,
    path: 'product-list',
    canActivate: [authGuardCanActivate],
    canMatch: [authGuardCanMatch],
  },
  {
    path: '',
    redirectTo: '/product-list',
    pathMatch: 'full'
  },
];
