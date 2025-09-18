import { Component } from '@angular/core';
import { MenuComponent } from './core/components/menu/menu.component';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-root',
    imports: [MenuComponent, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pm-platform-fe';
}
