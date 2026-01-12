import { Routes } from '@angular/router';
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from './features/layout/guards';

export const routes: Routes = [
  {
    path: 'login',
    title: 'Inicio de Sesion',
    canActivate: [isNotAuthenticatedGuard],
    loadComponent: () => import('./features/auth/pages/login-page/login-page'),
  },
  {
    path: 'home',
    title: 'Inicio',
    canActivate: [isAuthenticatedGuard],
    loadComponent: () => import('./features/layout/pages/home-layout/home-layout'),
    children: [
      {
        path: 'welcome',
        title: 'Bienvenido/a',
        loadComponent: () => import('./features/layout/pages/welcome-page/welcome-page'),
      },
      {
        path: 'settings',
        title: 'Configuraciones',
        loadComponent: () => import('./features/layout/pages/settings-page/settings-page'),
      },
      {
        path: 'users',
        title: 'Usuarios',
        loadComponent: () => import('./features/administration/pages/user-admin/user-admin'),
      },
      {
        path: 'applications',
        title: 'Sistemas',
        loadComponent: () =>
          import('./features/administration/pages/application-admin/application-admin'),
      },
      {
        path: 'apps',
        title: 'Mis sistemas',
        loadComponent: () => import('./features/access-portal/pages/my-access/my-access'),
      },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    ],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
