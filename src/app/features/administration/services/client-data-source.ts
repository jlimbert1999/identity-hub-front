import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { ClientResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class ClientDataSource {
  readonly URL = `${environment.baseUrl}/clients`;
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
    return this.http.get<{ clients: ClientResponse[]; total: number }>(this.URL, {
      params,
    });
  }
}
