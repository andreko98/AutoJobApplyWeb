import { Component, OnInit } from '@angular/core';
import { User } from '../../models/users/user.model';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  user: User = this.createEmptyUser();
  userId = 1; // Simulação de usuário logado
  curriculoFile: File | null = null;
  curriculoPath: string = '';

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

  salvar() {
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
      nome: '',
      sobrenome: '',
      email: '',
      endereco: '',
      sobre: '',
      dataNascimento: '',
      curriculoPath: ''
    };
  }

  onFileSelected(event: any) {
    this.curriculoFile = event.target.files[0];
  }

  uploadCurriculo(userId: number) {
    if (!this.curriculoFile) return;

    const formData = new FormData();
    formData.append('file', this.curriculoFile);

    this.userService.uploadCurriculo(userId, this.curriculoFile)
    .subscribe({
      next: res => {
        this.curriculoPath = res.path;
        alert('Currículo enviado com sucesso!');
      },
      error: err => {
        console.error(err);
        alert('Erro ao enviar currículo.');
      }
    });
  }
}
