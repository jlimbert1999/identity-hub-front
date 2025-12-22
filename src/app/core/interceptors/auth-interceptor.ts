import { HttpClient, HttpErrorResponse, type HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

let refreshing = false;
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error.status);
      if (error.status !== 401) {
        return throwError(() => error);
      }

      // evitar loop
      if (req.url.includes('/auth/refresh')) {
        router.navigate(['/login']);
        return throwError(() => error);
      }

      if (refreshing) {
        return throwError(() => error);
      }

      refreshing = true;
      console.log('Llamando refresh');
      return http.post(`${environment.baseUrl}/oauth/refresh`, {}, { withCredentials: true }).pipe(
        switchMap(() => {
          refreshing = false;
          return next(req);
        }),
        catchError((refreshError) => {
          refreshing = false;
          router.navigate(['/login']);
          return throwError(() => refreshError);
        })
      );
    })
  );
};
