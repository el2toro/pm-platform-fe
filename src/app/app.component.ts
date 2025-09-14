import { Component } from '@angular/core';
import { MenuComponent } from './core/components/menu/menu.component';
import { DashboardFeatureComponent } from './features/dashboard-feature/dashboard-feature.component';

@Component({
    selector: 'app-root',
    imports: [MenuComponent, DashboardFeatureComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pm-platform-fe';
}
