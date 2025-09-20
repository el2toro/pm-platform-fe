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

@Component({
  selector: 'app-add-edit-project-modal',
  templateUrl: './add-edit-project-modal.component.html',
  styleUrls: ['./add-edit-project-modal.component.scss'],
  imports: [DialogModule, InputTextModule, ButtonModule, MessageModule, ReactiveFormsModule, InputText, DatePickerModule, Select, FloatLabelModule, TextareaModule, FloatLabel],
  providers: [MessageService]
})
export class AddEditProjectModalComponent implements OnInit {
  messageService = inject(MessageService);
  formGroup!: FormGroup;
  formSubmitted = false;
  projectToUpdate!: ProjectModel;
  projectStatuses = <any[]>[];

  get iSCreate() : boolean{
    return !this.projectToUpdate;
  }

  constructor(private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.projectToUpdate = this.config.data;
    this.mapProjectStatuses();
    this.openModal();
  }

  openModal(){
    this.projectToUpdate ?
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
      projectStatus: [null]
    })
  }

   editProjectForm(){
    this.formGroup = this.formBuilder.group({
      name: [this.projectToUpdate.name],
      description: [this.projectToUpdate.description],
      startDate: [new Date(this.projectToUpdate.startDate)],
      projectStatus: [this.projectToUpdate.projectStatus]
    })
  }

  onClose(){
    this.ref.close();
  }

  onCreate(){
    if(!this.formGroup.dirty){ 
      console.log('value changed')
   };

   if(!this.iSCreate){
    this.mapToUpdateProject();

    console.log(this.projectToUpdate)

    this.ref.close(this.projectToUpdate);
    return;
   }

    this.ref.close(this.formGroup.value)
  }

  mapToUpdateProject(){
    this.projectToUpdate.name = this.formGroup.get(['name'])?.value;
    this.projectToUpdate.description = this.formGroup.get(['description'])?.value;
    this.projectToUpdate.startDate = this.formGroup.get(['startDate'])?.value;
     this.projectToUpdate.projectStatus = this.formGroup.get(['projectStatus'])?.value;
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
