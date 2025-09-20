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

@Component({
  selector: 'app-add-edit-project-modal',
  templateUrl: './add-edit-project-modal.component.html',
  styleUrls: ['./add-edit-project-modal.component.scss'],
  imports: [DialogModule, InputTextModule, ButtonModule, MessageModule, ReactiveFormsModule, InputText, DatePickerModule],
  providers: [MessageService]
})
export class AddEditProjectModalComponent implements OnInit {
  messageService = inject(MessageService);
  formGroup!: FormGroup;
  formSubmitted = false;
  projectToUpdate!: ProjectModel;
  
  get iSCreate() : boolean{
    return !this.projectToUpdate;
  }

  constructor(private ref: DynamicDialogRef, 
    private config: DynamicDialogConfig,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.projectToUpdate = this.config.data

    //this.createProjectForm();
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
      startDate: [null]
    })
  }

   editProjectForm(){
    this.formGroup = this.formBuilder.group({
      name: [this.projectToUpdate.name],
      description: [this.projectToUpdate.description],
      startDate: [new Date()]
    })
  }

  onClose(){
    this.ref.close();
  }

  onCreate(){
    if(!this.formGroup.dirty){ 
      console.log('value changed')
   };

    //this.ref.close(this.formGroup.value)
  }
}
