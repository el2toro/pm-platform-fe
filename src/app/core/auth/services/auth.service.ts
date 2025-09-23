import { inject, Injectable } from '@angular/core';
import { LoginRequestModel } from '../models/login-request.model';
import { HttpClient } from '@angular/common/http';
import { LoginResponse as LoginResponseModel } from '../models/login-response';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false; // Replace with real logic (token check, API call, etc.)
  loginResponse: any;

constructor() { }
 private accessToken$ = new BehaviorSubject<string | null>(null);
 private refreshToken$ = new BehaviorSubject<string | null>(null);
 private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7194/api/auth';

    /** Keep access token only in memory */
  get accessToken(): string | null {
    return this.accessToken$.value;
  }

  isLoggedIn(): boolean {
    return !!this.accessToken$.value;
  }

  login(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
   return  this.http.post<LoginResponseModel>(`${this.baseUrl}/login`, loginRequest, { withCredentials: true })
     .pipe(
      tap((response) => this.setTokens(response.refreshToken, response.token))
    );
  }

    /** Ask backend to refresh token using HttpOnly cookie */
  refreshToken(tenantId: string): Observable<any>{
    console.log('refresh token: ', this.refreshToken$.value)
    return this.http.post<{ refreshToken: string, accessToken: string }>(
      `${this.baseUrl}/refreshtoken`,
      {refreshToken: this.refreshToken$.value, tenantId: tenantId},
      { withCredentials: true }
    ).pipe(
      tap(res => this.setTokens(res.refreshToken, res.accessToken)),
      //map(res => {res.refreshToken, console.log('from refreshRoken(): ', res)})
    );
  }

  logout(tenantId: string) : Observable<any> {
    const refreshToken = this.refreshToken$.value;
    this.setTokens(null, null);
    return this.http.post<any>(`${this.baseUrl}/logout`, {refreshToken: refreshToken, tenantId: tenantId}, { withCredentials: true });
  }

  private setTokens(refreshToken: string | null, accessToken: string | null): void{
    this.accessToken$.next(accessToken);
    this.refreshToken$.next(refreshToken);
  }
}
