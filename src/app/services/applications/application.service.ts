import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Application } from '../../models/applications/application.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApplicationService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/applications`;

  constructor(private http: HttpClient) {}

  apply(userId: number, jobId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/apply?userId=${userId}&jobId=${jobId}`, {});
  }

  getByUser(userId: number): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/user/${userId}`);
  }
}
