import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USER_KEY = 'userId';
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, senha }, { headers: { 'Content-Type': 'application/json' } }).pipe(
      tap(user => {
        if (user && user.id) {
          localStorage.setItem(this.USER_KEY, user.id.toString());
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.USER_KEY) !== null;
  }

  getUserId(): number | null {
    const id = localStorage.getItem(this.USER_KEY);
    return id ? Number(id) : null;
  }
}
