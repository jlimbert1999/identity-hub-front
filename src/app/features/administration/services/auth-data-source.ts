import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthDataSource {
  private http = inject(HttpClient);
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
}
