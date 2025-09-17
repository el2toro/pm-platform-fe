import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TabsModule } from 'primeng/tabs';
import { ProjectDetailsComponent } from "../project-details/project-details.component";
import { RouterOutlet } from '@angular/router';
import { KanbanBoardFeatureComponent } from "../../../kanban-board-feature/kanban-board-feature.component";

@Component({
  selector: 'app-dashboard-menu',
  templateUrl: './dashboard-menu.component.html',
  styleUrls: ['./dashboard-menu.component.scss'],
  standalone: true,
  imports: [CommonModule, TabsModule, ProjectDetailsComponent, RouterOutlet, KanbanBoardFeatureComponent]
})
export class DashboardMenuComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
