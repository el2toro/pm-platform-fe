import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskModel } from '../../models/task-model';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TaskStatus } from '../../enums/task-status.enum';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-edit-task-modal',
  templateUrl: './add-edit-task-modal.component.html',
  styleUrls: ['./add-edit-task-modal.component.scss'],
  providers: [MessageService],
  imports: [DialogModule, InputTextModule, ButtonModule, MessageModule, ReactiveFormsModule, InputText, DatePickerModule, Select, FloatLabelModule, TextareaModule, FloatLabel]
})
export class AddEditTaskModalComponent implements OnInit {
messageService = inject(MessageService);
  formGroup!: FormGroup;
  formSubmitted = false;
  task = new TaskModel();
  taskStatuses = <any[]>[];

  // get iSCreate() : boolean{
  //   return !!this.task;
  // }

  constructor(private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.task = this.config.data;

   this.mapTaskStatuses();
    //this.openModal();
    this.editTaskForm()
  }

  openModal(){
    //this.iSCreate ?
   // this.createTaskForm() :
    this.editTaskForm();
  }

  isInvalid(controlName: string) {
        const control = this.formGroup.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }

  createTaskForm(){
    this.formGroup = this.formBuilder.group({
      title: [null],
      description: [null],
      dueDate: [null],
      taskStatus: [null]
    })
  }

   editTaskForm(){
    this.formGroup = this.formBuilder.group({
      title: [this.task.title],
      description: [this.task.description],
      dueDate: [new Date(this.task.dueDate)],
      taskStatus: [this.task.taskStatus]
    })
  }

  onClose(){
    this.ref.close();
  }

  onSaveOrCreate(){
  //   if(!this.formGroup.dirty){ 
  //     console.log('value changed')
  //  };

    this.mapFormToTaskModel();

    this.ref.close(this.task)
  }

  mapFormToTaskModel(){
    // if(this.iSCreate){
    //   this.task = new TaskModel();
    // }

    // if(!this.iSCreate){
      this.task.taskStatus = this.formGroup.get(['taskStatus'])?.value;
    // }

    this.task.title = this.formGroup.get(['title'])?.value;
    this.task.description = this.formGroup.get(['description'])?.value;
    this.task.dueDate = formatDate(this.formGroup.get('dueDate')?.value, 'yyyy-MM-dd', 'en-US');
    //this.task.endDate = formatDate(this.formGroup.get('endDate')?.value, 'yyyy-MM-dd', 'en-US');
  }


  //TODO: map dinamicly not hardcoded
  mapTaskStatuses(){
    this.taskStatuses = [
      { name: 'Backlog', value: TaskStatus.Backlog },
      { name: 'To Do', value: TaskStatus.ToDo },
      { name: 'On Hold', value: TaskStatus.OnHold },
      { name: 'In progress', value: TaskStatus.InProgress },
      { name: 'Canceled', value: TaskStatus.Cancelled },
      { name: 'Completed', value: TaskStatus.Completed },
      { name: 'Blocked', value: TaskStatus.Blocked },
      { name: 'Review', value: TaskStatus.Review },
      { name: 'Testing', value: TaskStatus.Testing },
      { name: 'Done', value: TaskStatus.Done }
    ]
  }
}
