import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { OverviewComponent } from '../overview/overview.component';
import { ProjectDetailsComponent } from "../project-details/project-details.component";

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, TabsModule, OverviewComponent, ProjectDetailsComponent]
})
export class DashboardMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
