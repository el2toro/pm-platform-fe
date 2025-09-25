import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { CommonModule, formatDate } from '@angular/common';
import { CommentModel } from '../../models/comment-model';
import { SubtaskModel } from '../../models/subtask-model';
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-add-edit-task-modal',
  templateUrl: './add-edit-task-modal.component.html',
  styleUrls: ['./add-edit-task-modal.component.scss'],
  providers: [MessageService],
  imports: [CommonModule, DialogModule, InputTextModule, ButtonModule, MessageModule, ReactiveFormsModule, InputText, DatePickerModule, Select, FloatLabelModule, TextareaModule, FloatLabel, TableModule, FormsModule]
})
export class AddEditTaskModalComponent implements OnInit {
  private messageService = inject(MessageService);
  private ref = inject(DynamicDialogRef);
  private config = inject(DynamicDialogConfig);
  private formBuilder = inject(FormBuilder);
  formGroup!: FormGroup;
  formSubmitted = false;
  task = new TaskModel();
  taskStatuses = <any[]>[];

  get iSCreate() : boolean{
    return !this.task;
  }

  get subtasks() {
    return this.formGroup.get(['subtasks']) as FormArray;
  }

   get comments() {
    return this.formGroup.get(['comments']) as FormArray;
  }

  constructor() { }

  ngOnInit() {
    this.task = this.config.data;

   this.mapTaskStatuses();
    this.openModal();

     // this.formGroup.get(['subtaskTitle'])?.disable();
  }

  openModal(){
    this.iSCreate ?
    this.createTaskForm() :
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
      taskStatus: [null],
      subtasks: this.formBuilder.array([]),
      subtaskTitle: [null],
      comments: this.formBuilder.array([]),
      commentContent: [null]

    })
  }

   editTaskForm(){
    this.formGroup = this.formBuilder.group({
      title: [this.task.title],
      description: [this.task.description],
      dueDate: [new Date(this.task.dueDate)],
      taskStatus: [this.task.taskStatus],
      subtasks: this.formBuilder
          .array(this.task.subtasks?.map(st => this.formBuilder
          .group({id: st.id,  title: st.title , isComplited: st.isCompleted}))),

      comments: this.formBuilder
          .array(this.task.comments?.map(comment => this.formBuilder
          .group({content: comment.content})))
    });

    //TODO: the subtasks are not updated in database, at the backend it arrives ok
    this.formGroup.controls['subtasks'].valueChanges.subscribe(value => {
      this.task.subtasks = value;
      console.log('subtasks: ', this.task.subtasks);
     });

      this.formGroup.controls['comments'].valueChanges.subscribe(value => {
      this.task.comments = value;

      console.log('comments: ', this.task.comments);
     });
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
     if(this.iSCreate){
       this.task = new TaskModel();
        //this.task.comments = this.comments;
       // this.task.subtasks = this.subtasks;
     }

     if(!this.iSCreate){
      this.task.taskStatus = this.formGroup.get(['taskStatus'])?.value;
     }

    this.task.title = this.formGroup.get(['title'])?.value;
    this.task.description = this.formGroup.get(['description'])?.value;
    this.task.dueDate = formatDate(this.formGroup.get('dueDate')?.value, 'yyyy-MM-dd', 'en-US');
    this.task.subtasks = this.formGroup.get(['subtasks'])?.value;
    this.task.comments = this.formGroup.get(['comments'])?.value;
  }

  addComment(){
     const content = this.formGroup.value.commentContent?.trim();
  if (!content) return;
  this.comments.push(this.formBuilder.group({ content: [content] }));
  this.formGroup.get('commentContent')?.reset();
  }

  deleteComment(index: number){
     this.comments?.removeAt(index);
  }

 addSubtask() {
 const title = this.formGroup.value.subtaskTitle?.trim();
  if (!title) return;
  this.subtasks.push(this.formBuilder.group({ title: [title] }));
  this.formGroup.get('subtaskTitle')?.reset();
}

deleteSubtask(index: number) {
  this.subtasks?.removeAt(index);
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
