import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { MENU_ACTIONS } from '../constants/menu.config';
import { AuthUserResponse } from '../../administration/interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthDataSource {
  readonly URL = `${environment.baseUrl}/auth`;
  private http = inject(HttpClient);

  _user = signal<AuthUserResponse | null>(null);

  user = computed(() => this._user());
  menu = computed(() => {
    if (!this._user()) return [];
    return MENU_ACTIONS.filter((item) =>
      (item['roles'] as string[]).some((role) => this._user()?.roles.includes(role))
    );
  });

  login(login: string, password: string, remember: boolean = false) {
    if (remember) {
      localStorage.setItem('login', login);
    } else {
      localStorage.removeItem('login');
    }
    return this.http
      .post(`${environment.baseUrl}/oauth/login`, { login, password }, { withCredentials: true })
      .pipe(
        tap((resp) => {
          console.log(resp);
        })
      );
  }

  checkAuthStatus() {
    // return this.http
    //   .get<{ user: AuthUserResponse }>(`${this.URL}/status`, { withCredentials: true })
    //   .pipe(
    //     tap((resp) => this._user.set(resp.user)),
    //     map(() => true),
    //     catchError(() => of(false))
    //   );
    // TODO replace for url autgh
    return this.http
      .get<{ user: AuthUserResponse }>(`${environment.baseUrl}/oauth/status`, {
        withCredentials: true,
      })
      .pipe(
        tap(({ user }) => {
          console.log(user);
          this._user.set(user);
          console.log(this.menu());
        }),
        map(() => true),
        catchError(() => {
          window.location.href = '/login';
          return of(false);
        })
      );
  }

  logout() {
    return this.http.post(`${environment.baseUrl}/oauth/logout`, {}, { withCredentials: true });
  }
}
