import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/services/auth.service';
import { MenuComponent } from "./core/components/menu/menu.component";
import { DashboardNavComponent } from "./features/dashboard-feature/components/dashboard-nav/dashboard-nav.component";
import { SignalRService } from '../shared/services/signalR/signalR.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, MenuComponent, DashboardNavComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  title = 'pm-platform-fe';
  private authService = inject(AuthService);
  private signalRService = inject(SignalRService);

  get userIsLoggedIn(): boolean{
    return this.authService.isLoggedIn();
  }

  constructor() { }

  ngOnInit(): void {
     this.signalRService.startConnection();
  }
}
