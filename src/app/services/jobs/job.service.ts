import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../../models/jobs/jobs.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class JobService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/jobs`;
  private recentJobsCount = 10;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Job[]> {
    return this.http.get<Job[]>(this.apiUrl);
  }

  scrapeJobs(search: string): Observable<{ total: number }> {
    return this.http.post<{ total: number }>(`${this.apiUrl}/scrape/${search}`, {});
  }

  getRecentJobs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/jobs/recent/${this.recentJobsCount}`);
  }
}

