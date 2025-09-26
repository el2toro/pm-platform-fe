import { Component, inject, OnInit } from '@angular/core';
import { InputText, InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { ProjectModel } from '../../models/project-model';
import { Select } from "primeng/select";
import { ProjectStatus } from '../../enums/project-status.enum';
import { FloatLabelModule } from 'primeng/floatlabel';
import { FloatLabel } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
 import { formatDate } from '@angular/common';

@Component({
  selector: 'app-add-edit-project-modal',
  templateUrl: './add-edit-project-modal.component.html',
  styleUrls: ['./add-edit-project-modal.component.scss'],
  imports: [DialogModule, InputTextModule, ButtonModule, MessageModule, ReactiveFormsModule, InputText, DatePickerModule, Select, FloatLabelModule, TextareaModule, FloatLabel],
})
export class AddEditProjectModalComponent implements OnInit {
  formGroup!: FormGroup;
  formSubmitted = false;
  project!: ProjectModel;
  projectStatuses = <any[]>[];

  get iSCreate() : boolean{
    return !this.project;
  }

  constructor(private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.project = this.config.data;
    this.mapProjectStatuses();
    this.openModal();
  }

  openModal(){
    this.project ?
      this.editProjectForm() : 
      this.createProjectForm();
  }

  isInvalid(controlName: string) {
        const control = this.formGroup.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }

  createProjectForm(){
    this.formGroup = this.formBuilder.group({
      name: [null],
      description: [null],
      startDate: [null],
      endDate: [null]
    })
  }

   editProjectForm(){
    this.formGroup = this.formBuilder.group({
      name: [this.project.name],
      description: [this.project.description],
      startDate: [new Date(this.project.startDate)],
      endDate: [new Date(this.project.endDate)],
      projectStatus: [this.project.projectStatus]
    })
  }

  onClose(){
    this.ref.close();
  }

  onSaveOrCreate(){
  //   if(!this.formGroup.dirty){ 
  //     console.log('value changed')
  //  };

    this.mapFormToProjectModel();

    this.ref.close(this.project)
  }

  mapFormToProjectModel(){
    if(this.iSCreate){
      this.project = new ProjectModel();
    }

    if(!this.iSCreate){
       this.project.projectStatus = this.formGroup.get(['projectStatus'])?.value;
    }

    this.project.name = this.formGroup.get(['name'])?.value;
    this.project.description = this.formGroup.get(['description'])?.value;
    this.project.startDate = formatDate(this.formGroup.get('startDate')?.value, 'yyyy-MM-dd', 'en-US');
    this.project.endDate = formatDate(this.formGroup.get('endDate')?.value, 'yyyy-MM-dd', 'en-US');
  }

  mapProjectStatuses(){
    this.projectStatuses = [
      { name: 'Not started', value: ProjectStatus.NotStarted },
      { name: 'On hold', value: ProjectStatus.OnHold },
      { name: 'Pending', value: ProjectStatus.Pending },
      { name: 'In progress', value: ProjectStatus.InProgress },
      { name: 'Canceled', value: ProjectStatus.Cancelled },
      { name: 'Completed', value: ProjectStatus.Completed }
    ]
  }
}


