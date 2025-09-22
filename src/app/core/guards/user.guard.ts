import { inject, Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  authService = inject(AuthService);
  router = inject(Router);

  constructor() {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      // Redirect logged-in users to dashboard
      return this.router.createUrlTree(['/dashboard']);
    }
    return true; // allow if NOT logged in
  }
}
