import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  irParaCadastro() {
    this.router.navigate(['/user-profile']);
  }

  login() {
    const email = this.loginForm.value.email;

    this.authService.login(email).subscribe(user => {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/']);
      } else {
        this.errorMessage = 'Usuário não encontrado. Cadastre-se.';
      }
    });
  }
}
