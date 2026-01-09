import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { AuthUserResponse } from '../../administration/interfaces';
import { MENU_ACTIONS } from '../constants/menu.config';

@Injectable({
  providedIn: 'root',
})
export class AuthDataSource {
  readonly URL = `${environment.baseUrl}/auth`;
  private http = inject(HttpClient);

  private _user = signal<AuthUserResponse | null>(null);

  user = computed(() => this._user());
  menu = computed(() => {
    if (!this._user()) return [];
    return MENU_ACTIONS.filter((item) =>
      (item['roles'] as string[]).some((role) => this._user()?.roles.includes(role))
    );
  });

  checkAuthStatus() {
    return this.http
      .get<{ user: AuthUserResponse }>(`${environment.baseUrl}/auth/status`, {
        withCredentials: true,
      })
      .pipe(
        tap(({ user }) => {
          this._user.set(user);
        }),
        map(() => true),
        catchError(() => {
          return of(false);
        })
      );
  }

  logout() {
    return this.http.post(`${environment.baseUrl}/auth/logout`, {}, { withCredentials: true });
  }
}
