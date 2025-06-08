import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../../models/users/user.model';
import { environment } from '../../environments/environment';
import { EmailCredential } from '../../models/email/credential.model';

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
    return this.http.post<User>(this.apiUrl, JSON.stringify(user));
  }

  uploadCV(userId: number, file: File): Observable<{ path: string }> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<{ path: string }>(
      `${this.apiUrl}/${userId}/uploadCV`, 
      formData
    );
  }

  login(email: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, email, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  saveEmailCredential(userId: number, email: string, pass: string): any {
    const request: EmailCredential = {
      userId: userId,
      email: email,
      password: pass
    };

    return this.http.post(`${environment.apiUrl}/SaveEmailCredential`, JSON.stringify(request))
    .subscribe({
      next: () => alert('Configuração de e-mail salva com sucesso!'),
      error: err => {
        console.error(err);
        alert('Erro ao salvar configuração de e-mail.');
      }
    });
  }
}