import { Router, type CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

import { AuthDataSource } from '../services/auth-data-source';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthDataSource);
  const router = inject(Router);
  return authService.checkAuthStatus().pipe(
    tap((ok) => {
      if (!ok) {
        router.navigate(['/auth/login']);
      }
    })
  );
};
