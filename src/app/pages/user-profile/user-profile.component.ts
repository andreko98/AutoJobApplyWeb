import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/users/user.model';
import { UserService } from '../../services/users/user.service';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserProfileComponent implements OnInit {
  user: User = this.createEmptyUser();
  userId?: number;
  file: File | null = null;
  path: string = '';

  activeTab: number = 0;
  emailConfig = { email: '', pass: '' };

  birthDateInvalid = false;

  constructor(private userService: UserService, private location: Location, protected authService: AuthService) {}

  ngOnInit() {
    this.userId = this.authService.getUserId();

    if (this.userId != 0) {
      this.userService.getById(this.userId).subscribe({
        next: data => {
          this.user = data
          this.user.dateOfBirth = new Date(this.user.dateOfBirth).toISOString().split('T')[0];

          this.getCVPath();
        },
        error: () => {
          // Usuário ainda não existe — permanece com campos vazios para cadastro
          this.user.id = 0;
        }
      });
    }
  }

  getCVPath() {
    this.userService.getCVPath(this.user.id).subscribe(response => this.path = response.path);
  }

  validateBirthDate() {
    if (!this.user.dateOfBirth) {
      this.birthDateInvalid = false;
      return;
    }
    const date = new Date(this.user.dateOfBirth);
    const now = new Date();
    // Considera inválido se for no futuro ou se a idade for maior que 120 anos
    this.birthDateInvalid = date > now || now.getFullYear() - date.getFullYear() > 120;
  }

  save() {
    this.validateBirthDate();
    if (this.birthDateInvalid) return;

    if (this.user.id === 0) {
      this.userService.create(this.user).subscribe(result => {
        this.user = result;
        localStorage.setItem("UserId", this.user.id.toString());
        alert('Cadastro e login realizados com sucesso!');
      });
    } else {
      this.userService.update(this.user.id, this.user).subscribe(() => {
        alert('Perfil atualizado com sucesso!');
      });
    }
  }

  private createEmptyUser(): User {
    return {
      id: 0,
      name: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      about: '',
      dateOfBirth: '',
      cvPath: ''
    };
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  uploadCV(userId: number) {
    if (!this.file) return;

    this.userService.uploadCV(userId, this.file)
    .subscribe({
      next: res => {
        this.path = res.path;
        alert('Currículo enviado com sucesso!');
      },
      error: err => {
        console.error(err);
        alert('Erro ao enviar currículo.');
      }
    });
  }

  saveEmailCredential() {
    this.userService.saveEmailCredential(this.user.id, this.emailConfig.email, this.emailConfig.pass).subscribe({
      next: () => {
        alert('Configuração de email salva com sucesso!');
      },
      error: (err: any) => {
        console.error(err);
        alert('Erro ao salvar configuração de email.');
      }
    });
  }

  goBack() {
    this.location.back();
  }
}
