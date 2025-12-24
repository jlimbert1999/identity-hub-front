import { Router, type CanActivateFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

import { map, catchError, of } from 'rxjs';

import { environment } from '../../../../../environments/environment';

export const userGuard: CanActivateFn = (route, state) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return http.get(`${environment.baseUrl}/oauth/status`, { withCredentials: true }).pipe(
    map((user) => {
      console.log(user);
      return true;
    }),
    catchError(() => {
      window.location.href = '/login';
      return of(false);
    })
  );
};
