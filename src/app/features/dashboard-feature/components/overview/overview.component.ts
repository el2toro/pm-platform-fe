import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ActiveTaskComponent } from "../active-task/active-task.component";
import { ProgressBarModule } from 'primeng/progressbar';
import { WaveChartComponent } from "../../../../../shared/components/wave-chart/wave-chart.component";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  imports: [TableModule, ProgressBarModule, CommonModule, ActiveTaskComponent, WaveChartComponent],
  standalone: true
})
export class OverviewComponent implements OnInit {
  projects = <any[]>[];

  constructor() { }

  ngOnInit() {
    this.initProjects();
  }

  initProjects(){
    this.projects  = [
      {name: 'Project Alpha', status: 'On Track', progress: '60', team: 'portrait.jpg', dueDate: 'Dec 03, 2025', chart: [4, 6, 5, 8, 7, 9, 6, 5, 7, 6, 8, 7]},
      {name: 'Product Beta', status: 'At Risk', progress: '40', team: 'portrait.jpg', dueDate: 'Nov 15, 2025', chart: [3, 4, 6, 5, 7, 8, 7, 6, 5, 4, 6, 5]},
      {name: 'Feature Gamma', status: 'Delayed', progress: '20', team: 'portrait.jpg', dueDate: 'Jan 25, 2026', chart: [5, 7, 4, 6, 8, 5, 9, 6, 7, 8, 6, 5]},
      {name: 'Marketing Delta', status: 'On Track', progress: '75', team: 'portrait.jpg', dueDate: 'Oct 10, 2025', chart: [2, 4, 3, 5, 4, 6, 5, 4, 3, 5, 4, 6]},
      {name: 'UI Zeta', status: 'At Risk', progress: '50', team: 'portrait.jpg', dueDate: 'Jan 09, 2026', chart: [2, 3, 4, 6, 5, 7, 6, 5, 4, 6, 7, 5]}
    ]
  }

  getStatusColor(status: string){
    let backgroundColor = '';
    let color = ''

    switch(status){
      case 'On Track': 
        backgroundColor = '#E8FFF3';
        color = '#50CD89';
        break;

      case 'At Risk':
        backgroundColor = '#FFF5F8';
        color = '#F1416C';
        break;

      case 'Delayed':
       backgroundColor = '#FFF8DD';
       color = '#F6C000';
       break; 
    }

    return {backgroundColor: backgroundColor, color: color}
  }
}
