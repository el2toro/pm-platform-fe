import { inject, Injectable } from '@angular/core';
import { LoginRequestModel } from '../models/login-request.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LoginResponseModel as LoginResponseModel } from '../models/login-response.model';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { UserModel } from '../models/user.model';
import { RegisterRequestModel } from '../models/register-request.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }
 private accessToken$ = new BehaviorSubject<string | null>(null);
 private refreshToken$ = new BehaviorSubject<string | null>(null);
 private loggedInUser$ = new BehaviorSubject<UserModel | null>(null);
 private http = inject(HttpClient);
  private baseUrl = 'https://localhost:5054/auth-service';

    /** Keep access token only in memory */
  get accessToken(): string | null {
    return this.accessToken$.value;
  }

  get loggedInUser(): UserModel | null {
    return this.loggedInUser$.value;
  }

  get tenantId() : string{
    return this.loggedInUser?.tenantId ?? '';
  }

  get isLoggedIn(): boolean {
    return !!this.accessToken$.value;
  }

  login(loginRequest: LoginRequestModel): Observable<LoginResponseModel> {
   return  this.http.post<LoginResponseModel>(`${this.baseUrl}/login`, loginRequest, { withCredentials: true })
     .pipe(
      tap((response) => {
        this.setTokens(response.refreshToken, response.token);
        //TODO: add proper mapping
        this.loggedInUser$.next({
          id: response.userId, 
          tenantId: response.tenantId, 
          firstName: response.firstName, 
          lastName: response.lastName, 
          email: response.email, 
          image: 'avatar.jpg',
          fullName: response.firstName + ' ' + response.lastName
        });
      })
    );
  }

  register(registerRequest: RegisterRequestModel) {
      return this.http.post(`${this.baseUrl}/register`, registerRequest);
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
    );
  }

  logout() : Observable<any> {
    const refreshToken = this.refreshToken$.value;
    this.setTokens(null, null);
    return this.http.post<any>(`${this.baseUrl}/logout`, {refreshToken: refreshToken, tenantId: this.tenantId}, { withCredentials: true });
  }

  private setTokens(refreshToken: string | null, accessToken: string | null): void{
    this.accessToken$.next(accessToken);
    this.refreshToken$.next(refreshToken);
  }
}
