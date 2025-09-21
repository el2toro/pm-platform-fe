import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginRequestModel } from '../models/login-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor() {}
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7194/api/auth/login';

  login(loginRequest: LoginRequestModel) {
    return this.http.post(this.baseUrl, loginRequest);
  }
}
