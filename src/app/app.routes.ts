import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
  {
    component: LoginComponent,
    path: 'login',
  },
  {
    component: ProductComponent,
    path: 'product-list',
  },
];
