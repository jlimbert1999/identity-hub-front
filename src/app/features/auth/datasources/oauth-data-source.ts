import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OauthDataSource {
  private http = inject(HttpClient);

  constructor() {}

  login(login: string, password: string, remember: boolean = false) {
    if (remember) {
      localStorage.setItem('login', login);
    } else {
      localStorage.removeItem('login');
    }
    return this.http
      .post(`${environment.baseUrl}/auth/login`, { login, password }, { withCredentials: true })
      .pipe(
        tap((resp) => {
          console.log(resp);
        })
      );
  }

 
}
