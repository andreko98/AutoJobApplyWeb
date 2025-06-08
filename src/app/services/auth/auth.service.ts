import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USER_KEY = 'userId';

  login(userId: number) {
    localStorage.setItem(this.USER_KEY, userId.toString());
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
