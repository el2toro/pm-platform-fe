import { Component, OnInit } from '@angular/core';
import { DashboardNavComponent } from './components/dashboard-nav/dashboard-nav.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-feature',
  templateUrl: './dashboard-feature.component.html',
  styleUrls: ['./dashboard-feature.component.scss'],
  imports: [DashboardNavComponent, DashboardMenuComponent, RouterOutlet],
  standalone: true
})
export class DashboardFeatureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
