import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../models/jobs/jobs.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JobService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/jobs`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  scrape(term: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/scrape?termo=${term}`, {});
  }
}

