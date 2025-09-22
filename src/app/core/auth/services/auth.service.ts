import { inject, Injectable } from '@angular/core';
import { LoginRequestModel } from '../models/login-request.model';
import { HttpClient } from '@angular/common/http';
import { LoginResponse as LoginResponseModel } from '../models/login-response';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false; // Replace with real logic (token check, API call, etc.)
  loginResponse: any;

constructor() { }
 private accessToken$ = new BehaviorSubject<string | null>(null);
 private http = inject(HttpClient);
 private router = inject(Router);
  private baseUrl = 'https://localhost:7194/api/auth';

    /** Keep access token only in memory */
  get token(): string | null {
    return this.accessToken$.value;
  }

  isLoggedIn(): boolean {
    console.log('user is logged in: ', !!this.accessToken$.value)
    return !!this.accessToken$.value;
  }

  login(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
   return  this.http.post<LoginResponseModel>(`${this.baseUrl}/login`, loginRequest, { withCredentials: true })
     .pipe(
      tap((response) => this.accessToken$.next(response.token))
    );
  }

    /** Ask backend to refresh token using HttpOnly cookie */
  refreshToken() {
    return this.http.post<{ accessToken: string }>(
      `${this.baseUrl}/refreshtoken`,
      {},
      { withCredentials: true }
    ).pipe(
      tap(res => this.accessToken$.next(res.accessToken))
    );
  }

  logout() {
    this.accessToken$.next(null);
    return this.http.post(`${this.baseUrl}/logout`, {}, { withCredentials: true });
  }
}
