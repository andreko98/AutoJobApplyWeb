import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from './components/top-bar/top-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, TopBarComponent]
})
export class AppComponent {
  isAuthenticated = false;

  constructor(private router: Router) {
    // Simples verificação inicial (pode ser JWT, localStorage, etc.)
    const user = localStorage.getItem('userId');
    this.isAuthenticated = !!user;

    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
    }

    if (this.router.url === '/login') {
      this.router.navigate(['/']);
    }
  }
}
