import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { ProjectDetailsComponent } from "../project-details/project-details.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, TabsModule, ProjectDetailsComponent, RouterOutlet]
})
export class DashboardMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
