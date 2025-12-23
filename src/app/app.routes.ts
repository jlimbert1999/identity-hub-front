import { Routes } from '@angular/router';
import { authGuard } from './features/administration/guards/auth-guard';
import { userGuardGuard } from './features/portal/pages/guards/user-guard-guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/pages/login-page/login-page') },
  {
    path: 'auth/login',

    loadComponent: () => import('./features/administration/pages/login/login'),
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadComponent: () => import('./features/administration/pages/admin-layout/admin-layout'),
    children: [
      {
        path: 'users',
        loadComponent: () => import('./features/administration/pages/user-admin/user-admin'),
      },
      {
        path: 'clients',
        loadComponent: () => import('./features/administration/pages/client-admin/client-admin'),
      },
    ],
  },
  {
    path: 'apps',
    canActivate: [userGuardGuard],
    loadComponent: () => import('./features/portal/pages/app-laucher/app-laucher'),
  },
];
