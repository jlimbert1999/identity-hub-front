import { Routes } from '@angular/router';
import { userGuard } from './features/layout/guards/user-guard';

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
        path: 'applications',
        loadComponent: () => import('./features/administration/pages/client-admin/client-admin'),
      },
      {
        path: 'apps',
        loadComponent: () => import('./features/access-portal/pages/my-access/my-access'),
      },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
