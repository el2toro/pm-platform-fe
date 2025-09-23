import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../apis/project/project.service';
import { ProjectModel } from '../../models/project-model';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../../models/task-model';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { AddEditTaskModalComponent } from '../add-edit-task-modal/add-edit-task-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  standalone: true,
  imports: [TableModule, CommonModule, TaskStatusPipe],
})
export class ProjectDetailsComponent implements OnInit {
  dialogService = inject(DialogService);
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

      this.projectService.editTask(result).subscribe({
        next: () => this.getProjectDetails(),
      });
    });
  }

  getStatusColor(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
