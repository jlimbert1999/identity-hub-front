import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AccessDataSource {
  private readonly URL = `${environment.baseUrl}/hubs`;
  private http = inject(HttpClient);

  constructor() {}

  getMyApplicationms() {
    return this.http.get<any[]>(`${this.URL}/access`, { withCredentials: true });
  }
}
