import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { ProjectModel } from '../../models/project-model';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../../models/task-model';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { AddEditTaskModalComponent } from '../add-edit-task-modal/add-edit-task-modal.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TaskService } from '../../apis/task/task.service';
import { UserService } from '../../../user-management-feature/services/user.service';
import { UserModel } from '../../../user-management-feature/Models/user.mode';
import { CustomMessageService } from '../../../../../shared/services/custom-message.service';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { MenuService } from '../../../../core/services/menu.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    TaskStatusPipe,
    Toast,
    ButtonModule,
    ConfirmDialog,
  ],
  providers: [ConfirmationService],
})
export class ProjectDetailsComponent implements OnInit {
  private taskService = inject(TaskService);
  private dialogService = inject(DialogService);
  private router = inject(Router);
  private userService = inject(UserService);
  private customMessageService = inject(CustomMessageService);
  private confirmationService = inject(ConfirmationService);
  private menuService = inject(MenuService);
  ref!: DynamicDialogRef;
  tasks = <TaskModel[]>[];
  project!: ProjectModel;
  assignedUsers = <UserModel[]>[];
  taskCreatedByUser = new UserModel();

  constructor() {}

  ngOnInit() {
    this.project = history.state.project as ProjectModel;

    //TODO: get board id for second parameter
    this.menuService.setMenuItemVisible(false, this.project.id, this.project.id);

    this.getTasks();
    this.subscribeToTaskUpdates();
    this.getAssignedUser();
  }

  subscribeToTaskUpdates() {
    this.taskService.tasks$.subscribe({
      next: (tasks) => this.tasks = tasks
    });
  }

  getTasks() {
    this.taskService.getTasks(this.project.id).subscribe({
      next: () => this.getAssignedUser(),
    });
  }

  //TODO: To be reviewed, it is not working as expected
  getTaskAwner(createdBy: string): string {
    let fullname = '';
    this.userService.getUserById(this.project.tenantId, createdBy).subscribe({
      next: (user) => {
        fullname = `${user.firstName} ${user.lastName}`;
      },
    });
    return fullname;
  }

  openEditTaskModal(task: TaskModel) {
    this.ref =
      this.dialogService.open(AddEditTaskModalComponent, {
        width: '50%',
        modal: true,
        data: task,
      }) ?? new DynamicDialogRef();

    this.ref.onClose.subscribe((result) => {
      if (!result) {
        return;
      }

      this.taskService.updateTask(result).subscribe({
        next: () => this.customMessageService.showSuccess('Task updated successfully')
      });
    });
  }

  openCreateTaskModal() {
    this.ref =
      this.dialogService.open(AddEditTaskModalComponent, {
        width: '50%',
        modal: true,
        data: null,
      }) ?? new DynamicDialogRef();

    this.ref.onClose.subscribe((result) => {
      if (!result) {
        return;
      }

      result.projectId = this.project.id;

      this.taskService.createTask(result).subscribe({
        next: () =>
          this.customMessageService.showSuccess('Task created successfully'),
      });
    });
  }

  getAssignedUser() {
    this.userService
      .getUsersById(
        this.project.tenantId,
        this.project.id,
        this.assignedUserIds()
      )
      .subscribe({
        next: (users) => (this.assignedUsers = users),
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

  deleteTask(taskId: string): void {
    this.confirmationService.confirm({
      ///target: event.target as EventTarget,
      message: 'Do you want to delete this record?',
      header: 'Confirm',
      icon: 'pi pi-info-circle',
      rejectLabel: 'Cancel',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger',
      },

      accept: () => {
        this.taskService.deleteTask(this.project.id, taskId).subscribe({
          next: () => {
            this.customMessageService.showSuccess('Task deleted succesfully!');
          },
        });
      },
      reject: () => {
        //this.customMessageService.showError('Rejected');
      },
    });
  }

  private assignedUserIds(): string[] {
    return this.tasks
      .filter((t) => t.assignedTo !== null)
      .map((t) => t.assignedTo);
  }
}
