import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserDataSource {
  readonly URL = `${environment.baseUrl}/users`;
  private http = inject(HttpClient);

  constructor() {}

  create(form: object) {
    return this.http.post(this.URL, form);
  }

  update(id: number, form: object) {
    return this.http.patch(`${this.URL}/${id}`, form);
  }

  findAll(limit: number, offset: number, term?: string) {
    const params = new HttpParams({
      fromObject: { limit, offset, ...(term && { term }) },
    });
    return this.http.get<{ users: any[]; total: number }>(this.URL, {
      params,
    });
  }
}
