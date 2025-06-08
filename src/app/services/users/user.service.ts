import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../models/users/user.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/users`;

  constructor(private http: HttpClient) {}

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

  create(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  uploadCurriculo(userId: number, file: File): Observable<{ path: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ path: string }>(
      `${this.apiUrl}/${userId}/upload`, 
      formData
    );
  }

  login(email: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, email, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
}