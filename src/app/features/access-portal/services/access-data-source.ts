import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { AssginedAppsResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class AccessDataSource {
  private readonly URL = `${environment.baseUrl}/hub`;
  private http = inject(HttpClient);

  constructor() {}

  getMyApplicationms() {
    return this.http.get<AssginedAppsResponse[]>(`${this.URL}/access`, { withCredentials: true });
  }
}
