import { Component, inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { UserModel } from '../../../../core/auth/models/user.model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { TaskModel } from '../../../dashboard-feature/models/task-model';
import { TaskService } from '../../../dashboard-feature/apis/task/task.service';
import { TaskStatus } from '../../../dashboard-feature/enums/task-status.enum';

@Component({
  selector: 'app-edit-task-dialod',
  templateUrl: './edit-task-dialod.component.html',
  styleUrls: ['./edit-task-dialod.component.scss'],
  imports: [ReactiveFormsModule, InputIconModule, InputTextModule, FloatLabelModule, SelectModule, FormsModule, ButtonModule],
})
export class EditTaskDialodComponent implements OnInit {
  private authService = inject(AuthService);
  private config = inject(DynamicDialogConfig);
  private taskService = inject(TaskService);
  form!: FormGroup;
  users = <UserModel[]>[];
  task!: TaskModel;
  tenantId = this.authService.tenantId;
  statusOptions: any;

  constructor(private formBuilder: FormBuilder, private ref: DynamicDialogRef) { 
 
  }

  ngOnInit() {
    this.task = this.config.data.task;
    this.getUsers();
    this.buildForm();
    this.mapTaskStatusToSelectItem();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      title: [this.task.title],
      description: [this.task.description],
      status: [{value: this.task.taskStatus, label: TaskStatus[this.task.taskStatus]}],
      assignee: [this.users.find(u => u.id === this.task.assignedTo)]
    });
  }

  getUsers() {
    this.authService.getUsers(this.tenantId).subscribe({
      next: (users) => { 
        this.users = users, 
        this.buildForm() 
      }
    })
  }

  onClose(){
    this.ref.close();
  }

  onSave(){
  //   if(!this.formGroup.dirty){ 
  //     console.log('value changed')
  //  };

  this.mapFormToTaskModel();

  this.ref.close(this.task)
  }

  mapFormToTaskModel(){
    this.task.title = this.form.value.title;
    this.task.description = this.form.value.description;
    this.task.assignedTo = this.form.value.assignee ? this.form.value.assignee.id : null;
    this.task.taskStatus = this.form.value.status.value;
  }

  mapTaskStatusToSelectItem(){
   // Convert enum to dropdown options
  this.statusOptions = Object.keys(TaskStatus)
    .filter(key => !isNaN(Number(key))) // get only numeric keys (0, 1, 2)
    .map(key => {
      const numericKey = Number(key);
      return {
        label: TaskStatus[numericKey], // e.g. 'ToDo'
        value: numericKey as TaskStatus // e.g. 0
      };
    });
  }
}
