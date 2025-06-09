import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../models/users/user.model';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [CommonModule]
})
export class UserProfileComponent implements OnInit {
  user: User = this.createEmptyUser();
  userId = 1;
  file: File | null = null;
  path: string = '';

  activeTab: string = 'profile';
  emailConfig = { email: '', pass: '' };

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getById(this.userId).subscribe({
      next: data => this.user = data,
      error: () => {
        // Usuário ainda não existe — permanece com campos vazios para cadastro
        this.user.id = 0;
      }
    });
  }

  save() {
    if (this.user.id === 0) {
      this.userService.create(this.user).subscribe(result => {
        this.user = result; // Atualiza com ID retornado
        alert('Perfil criado com sucesso!');
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

    const formData = new FormData();
    formData.append('file', this.file);

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
}
