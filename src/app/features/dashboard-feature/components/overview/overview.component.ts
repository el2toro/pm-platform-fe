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
      {name: 'First project', status: 'On Track', progress: '60', team: 'Dream Team', dueDate: '25/09/2026', chart: 'no chart'},
      {name: 'First project', status: 'On Track', progress: '60', team: 'Dream Team', dueDate: '25/09/2026', chart: 'no chart'},
      {name: 'First project', status: 'On Track', progress: '60', team: 'Dream Team', dueDate: '25/09/2026', chart: 'no chart'},
      {name: 'First project', status: 'On Track', progress: '60', team: 'Dream Team', dueDate: '25/09/2026', chart: 'no chart'},
      {name: 'First project', status: 'On Track', progress: '60', team: 'Dream Team', dueDate: '25/09/2026', chart: 'no chart'}
    ]
  }
}
