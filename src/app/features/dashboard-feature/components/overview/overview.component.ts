import { Component, OnInit, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ActiveTaskComponent } from '../active-task/active-task.component';
import { ProgressBarModule } from 'primeng/progressbar';
import { WaveChartComponent } from '../../../../../shared/components/wave-chart/wave-chart.component';
import { ProjectService } from '../../apis/project/project.service';
import { ProjectModel } from '../../models/project-model';
import { ProjectStatusPipe } from '../../pipes/project-status.pipe';
import { ProjectStatus } from '../../enums/project-status.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  imports: [
    TableModule,
    ProgressBarModule,
    CommonModule,
    ActiveTaskComponent,
    WaveChartComponent,
    ProjectStatusPipe,
  ],
  standalone: true,
})
export class OverviewComponent implements OnInit {
  projects = <ProjectModel[]>[];
  selectedProject!: ProjectModel;

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit() {
    this.initProjects();
  }

  initProjects(){
    this.projectService.getProjects().subscribe({
      next: (projects) => this.projects = projects
    });
  }

  onRowSelect(){
    this.router.navigate(['/project-details'], { queryParams: { projectId: this.selectedProject.id, tenantId: this.selectedProject.tenantId } });
  }

  getChartData(project: ProjectModel): number[]{
    let createdAtDate = new Date(project.createdAt);
    let projectEndDate = new Date(project.endDate);
    
   let chartData = [
      project.projectStatus,
      Number(project.progress.toString().split('')[0]),  
      createdAtDate.getDay(),
      createdAtDate.getMonth(), 
      ...this.spliNumber(createdAtDate.getFullYear()),
      projectEndDate.getDay(),
      projectEndDate.getMonth(), 
      ...this.spliNumber(projectEndDate.getFullYear())
    ];

    return chartData;
  }

  spliNumber(value: number): number[]{
      let values = <number[]>[];

      value.toString().split('').forEach(c => {
      if(!Number(c)){
        values.push(Number(c))
      }
     })

     return values
  }

  getStatusColor(status: number) {
    let backgroundColor = '';
    let color = '';

    switch (status) {
      
      case ProjectStatus.NotStarted:
      case ProjectStatus.Pending:
        backgroundColor = '#f1f5f571';
        color = '#8c8888ff';
        break;

      case ProjectStatus.OnHold:
        backgroundColor = '#FFF8DD';
        color = '#F6C000';
        break;

      case ProjectStatus.InProgress:
        backgroundColor = '#E8FFF3';
        color = '#50CD89';
        break;

      case ProjectStatus.Cancelled:
        backgroundColor = '#FFF5F8';
        color = '#F1416C';
        break;

      case ProjectStatus.Completed:
        backgroundColor = '#E8FFF3';
        color = '#50CD89';
        break;
      }

    return { backgroundColor: backgroundColor, color: color };
  }

  getChartColor(projectStatus: number) : string{
    switch(projectStatus){
      case ProjectStatus.InProgress: 
      case ProjectStatus.Completed:
        return '#50CD89';

      case ProjectStatus.Cancelled: 
        return '#F1416C';

        case ProjectStatus.OnHold: 
        case ProjectStatus.Pending: 
        return '#F6C000';
    }

    return  '#c6c0c2ff';
  }
}

