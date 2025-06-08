import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  isAuthenticated = false;

  constructor(private router: Router) {
    // Simples verificação inicial (pode ser JWT, localStorage, etc.)
    const user = localStorage.getItem('user');
    this.isAuthenticated = !!user;

    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
    }
  }

  logout() {
    localStorage.removeItem('user');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }
}
