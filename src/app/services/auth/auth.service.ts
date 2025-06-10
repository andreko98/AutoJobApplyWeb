import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/users/user.model';
import { UserService } from '../users/user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USER_KEY = 'userId';
  private baseUrl = environment.apiUrl;
  private apiUrl = `${this.baseUrl}/auth`;

  public user: User | null = null;

  constructor(private http: HttpClient, protected userService: UserService) {}

  login(email: string, pass: string): Observable<any> {
    const body = { email: email, password: pass };

    return this.http.post<any>(`${this.apiUrl}/login`, JSON.stringify(body), { headers: { 'Content-Type': 'application/json' } }).pipe(
      tap(user => {
        if (user && user.id) {
          localStorage.setItem(this.USER_KEY, user.id.toString());
          this.user = user;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    if (this.user == null) {
      let userId = this.getUserId();
      if (userId === null) {
        return false;
      }

      this.userService.getById(userId || 0).subscribe(response => {
        this.user = response;
      });
    }

    return localStorage.getItem(this.USER_KEY) !== null;
  }

  getUserId(): number {
    const id = localStorage.getItem(this.USER_KEY);
    return id ? Number(id) : 0;
  }
}
