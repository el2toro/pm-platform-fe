import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/services/auth.service';
import { MenuComponent } from "./core/components/menu/menu.component";
import { DashboardNavComponent } from "./features/dashboard-feature/components/dashboard-nav/dashboard-nav.component";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MenuComponent, DashboardNavComponent],
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
