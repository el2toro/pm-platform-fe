import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree
} from '@angular/router';
import { AuthService } from '../auth/services/auth.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}

  canActivate(): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
        console.log('user logged in ')
      return true; // ✅ Allow navigation
    }
    // ❌ Not logged in → redirect to login page
    console.log('user not logged in ')
    return this.router.parseUrl('/login');
  }
}
