import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../Models/user.mode';
import { AuthService } from '../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5054/auth-service/tenants';
  private authService = inject(AuthService);
  private tenantId = this.authService.tenantId;

  constructor() {}

  getUsers(): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(`${this.baseUrl}/${this.tenantId}/users`);
  }

  getUsersById(
    tenantId: string,
    projectId: string,
    userIds: string[]
  ): Observable<UserModel[]> {
    return this.http.get<UserModel[]>(
      `${this.baseUrl}/${tenantId}/projects/${projectId}/users`,
      { params: { userIds: userIds } }
    );
  }

  getUserById(
    tenantId: string,
    userId: string
  ): Observable<UserModel> {
    return this.http.get<UserModel>(
      `${this.baseUrl}/${tenantId}/users/${userId}`,
    );
  }

  updateUser(user: UserModel): Observable<UserModel>{
   return this.http.put<UserModel>(`${this.baseUrl}/${this.tenantId}/users`, user);
  }
}
