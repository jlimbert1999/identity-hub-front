import { HttpClient, HttpParams } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { inject, Injectable } from '@angular/core';

import { tap } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ApplicationResponse, UserResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserDataSource {
  private http = inject(HttpClient);
  readonly URL = environment.baseUrl;

  readonly applications = toSignal(
    this.http.get<ApplicationResponse[]>(`${this.URL}/access/applications`),
    {
      initialValue: [],
    }
  );
  create(form: object) {
    return this.http.post<UserResponse>(`${this.URL}/access`, form);
  }

  update(id: string, form: object) {
    return this.http.put<UserResponse>(`${this.URL}/access/${id}`, form);
  }

  findAll(limit: number, offset: number, term?: string) {
    const params = new HttpParams({
      fromObject: { limit, offset, ...(term && { term }) },
    });
    return this.http
      .get<{ users: any[]; total: number }>(`${this.URL}/users`, {
        params,
      })
      .pipe(
        tap((resp) => {
          console.log(resp);
        })
      );
  }
}
