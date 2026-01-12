import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthDataSource } from '../services';
import { map, tap } from 'rxjs';

export const isNotAuthenticatedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authDataSource = inject(AuthDataSource);
  return authDataSource.checkAuthStatus().pipe(
    map((isAuth) => {
      if (isAuth) {
        router.navigateByUrl('/home');
        return false;
      }
      return true;
    })
  );
};
