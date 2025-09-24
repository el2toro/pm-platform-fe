import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../../apis/project/project.service';
import { ProjectModel } from '../../models/project-model';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../../models/task-model';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { AddEditTaskModalComponent } from '../add-edit-task-modal/add-edit-task-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskService } from '../../apis/task/task.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  standalone: true,
  imports: [TableModule, CommonModule, TaskStatusPipe],
})
export class ProjectDetailsComponent implements OnInit {
  private taskService =  inject(TaskService);
  private dialogService = inject(DialogService);
  private router = inject(Router);
  ref!: DynamicDialogRef;
  tasks = <TaskModel[]>[];
  projectId!: string;
  tenantId!: string;
  project = new ProjectModel();

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit() {
    this.getParams();
    this.getProjectDetails();
  }

  getParams() {
    this.route.queryParams.subscribe({
      next: (params) => {
        this.projectId = params['projectId'];
        this.tenantId = params['tenantId'];
      },
    });
  }

  getProjectDetails() {
    this.projectService
      .getProjectDetails(this.projectId, this.tenantId)
      .subscribe({
        next: (project) => {
          this.project = project;
          this.tasks = project.tasks;
        },
      });
  }

  openEditTaskModal(task: TaskModel) {
    this.ref = this.dialogService.open(AddEditTaskModalComponent, {
      width: '500px',
      modal: true,
      data: task,
    });

    this.ref.onClose.subscribe((result) => {
      if (!result) {
        return;
      }

      this.taskService.updateTask(result).subscribe({
        next: () => this.getProjectDetails(),
      });
    });
  }

  openCreateTaskModal() {
    this.ref = this.dialogService.open(AddEditTaskModalComponent, {
      width: '500px',
      modal: true,
      data: null,
    });

    this.ref.onClose.subscribe((result) => {
      if (!result) {
        return;
      }

      result.projectId = this.projectId;
     // result.tenantId = this.tenantId;

      this.taskService.createTask(result).subscribe({
        next: () => this.getProjectDetails(),
      });
    });
  }

  openTaskDetailsPage(taskId: string) {
    // Navigate to the task details page with the taskId as a route parameter
    // Assuming you have a router instance available
    this.router.navigate(['/task-details', taskId]);
  }

  getStatusColor(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
