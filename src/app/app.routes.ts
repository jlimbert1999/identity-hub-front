import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/pages/login-page/login-page') },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/administration/pages/login/login'),
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/administration/pages/admin-layout/admin-layout'),
  },
];
