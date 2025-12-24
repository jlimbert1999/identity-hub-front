import { Routes } from '@angular/router';
import { userGuard } from './features/portal/pages/guards/user-guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/pages/login-page/login-page') },
  {
    path: '',
    canActivate: [userGuard],
    loadComponent: () => import('./features/layout/pages/home-layout/home-layout'),
    children: [
      {
        path: 'users',
        loadComponent: () => import('./features/administration/pages/user-admin/user-admin'),
      },
      {
        path: 'clients',
        loadComponent: () => import('./features/administration/pages/client-admin/client-admin'),
      },
      {
        path: 'apps',
        loadComponent: () => import('./features/portal/pages/app-laucher/app-laucher'),
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
