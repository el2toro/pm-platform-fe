import { Component } from '@angular/core';
import { MenuComponent } from './core/components/menu/menu.component';
import { RouterOutlet } from '@angular/router';
import { DashboardNavComponent } from "./features/dashboard-feature/components/dashboard-nav/dashboard-nav.component";


@Component({
    selector: 'app-root',
    imports: [MenuComponent, RouterOutlet, DashboardNavComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pm-platform-fe';
}
