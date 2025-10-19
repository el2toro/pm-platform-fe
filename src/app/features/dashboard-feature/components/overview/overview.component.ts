import { Component, inject, OnInit } from '@angular/core';
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
import { AddEditProjectModalComponent } from '../add-edit-project-modal/add-edit-project-modal.component';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import { CustomMessageService } from '../../../../../shared/services/custom-message.service';
import { Observable } from 'rxjs';
import { SignalRService } from '../../../../../shared/services/signalR/signalR.service';
import { MenuService } from '../../../../core/services/menu.service';

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
    DynamicDialogModule,
    ToastModule
  ],
  standalone: true,
})
export class OverviewComponent implements OnInit {
  private projectService = inject(ProjectService);
  private router = inject(Router)
  private dialogService = inject(DialogService);
  private messageService = inject(CustomMessageService);
  private signalRService = inject(SignalRService);
  private menuService = inject(MenuService);

  get projectList(): Observable<ProjectModel[]>{
    return this.projectService.projects$;
  }

  projects = <ProjectModel[]>[];
  selectedProject!: ProjectModel;
  ref!: DynamicDialogRef;
  pageSize = 5;
  pageNumber = 1;
  totalRecords = 0;
  totalPages = 0;

  constructor() {}

  ngOnInit() {
    this.getProjects();
    this.signalRService.startConnection();
  }

  getProjects(){
    this.projectService.getProjects(this.pageNumber, this.pageSize).subscribe({
      next: (paginatedResponse) => {
        this.projects = paginatedResponse.items
        this.totalRecords = paginatedResponse.totalItems;
        this.totalPages = paginatedResponse.totalPages;
        this.projectService.setProjects(paginatedResponse.items);
      }
    });
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

  openCreateProjectModal(){
    this.ref = this.dialogService.open(AddEditProjectModalComponent, {
      width: '50%',
      modal: true
    }) ?? new DynamicDialogRef<any>;

    this.ref.onClose.subscribe(result => {
      if(!result){ return };

       this.projectService.createProject(result).subscribe({
        next: () => this.messageService.showSuccess('Project created successfully')
      })
    });
  }

  openEditProjectModal(project: ProjectModel){
    this.ref = this.dialogService.open(AddEditProjectModalComponent, {
      width: '50%',
      modal: true,
      data: project
    }) ?? new DynamicDialogRef<any>;

    this.ref.onClose.subscribe(result => {
      if(!result){ return };

       this.projectService.editProject(result).subscribe({
        next: () => this.messageService.showSuccess('Project updated successfully')
      })
    });
  }

  onPageChange(event: any) {
   this.pageNumber = event.first / event.rows + 1;
  this.pageSize = event.rows;

  // Example: call backend with pagination
  this.getProjects();
}

  onRowSelect(event: any) {
   const selectedProject: ProjectModel = event.data;
   if(event.data === true) { return; }
  // this.router.navigate(['/board'],  { state: { project: selectedProject } });

    this.menuService.setMenuItemDisabled(false);
    this.router.navigate(['/project-details'], { state: { project: selectedProject } });
  }

  //TODO: move to pipe or service
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

