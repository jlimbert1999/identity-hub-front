import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { environment } from '../../../../../environments/environment';

export const userGuardGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get(`${environment.baseUrl}/auth/status`, { withCredentials: true }).pipe(
    map(() => true),
    catchError(() => {
      console.log('ERRORRRRRRRRRRRRRRRRRRRRR');
      window.location.href = '/login';
      return of(false);
    })
  );
};
