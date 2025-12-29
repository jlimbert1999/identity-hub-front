import { Router, type CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';

import { AuthDataSource } from '../services';

export const userGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authDataSource = inject(AuthDataSource);
  return authDataSource.checkAuthStatus();

  // return http.get(`${environment.baseUrl}/oauth/status`, { withCredentials: true }).pipe(
  //   map((user) => {
  //     console.log(user);
  //     return true;
  //   }),
  //   catchError(() => {
  //     window.location.href = '/login';
  //     return of(false);
  //   })
  // );
};
