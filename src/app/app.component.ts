import { Component, inject } from '@angular/core';
import { MenuComponent } from './core/components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { DashboardNavComponent } from "./features/dashboard-feature/components/dashboard-nav/dashboard-nav.component";
import { AuthService } from './core/auth/services/auth.service';
import { LoginComponent } from "./core/auth/login/login.component";


@Component({
    selector: 'app-root',
    imports: [MenuComponent, RouterOutlet, DashboardNavComponent, LoginComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'pm-platform-fe';

  get userIsLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  constructor() { }
  private authService = inject(AuthService);
}
