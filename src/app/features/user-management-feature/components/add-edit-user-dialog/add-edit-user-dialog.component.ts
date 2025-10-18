import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { UserModel } from '../../Models/user.mode';

@Component({
  selector: 'app-add-edit-user-dialog',
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrls: ['./add-edit-user-dialog.component.scss'],
  imports: [ReactiveFormsModule]
})
export class AddEditUserDialogComponent implements OnInit {
  private form!: FormGroup;
  private dynamicDialogConfig = inject(DynamicDialogConfig);
  private user: UserModel = this.dynamicDialogConfig.data.user;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm();
  }

  initForm(){
    this.form = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email],
      phone: [this.user.phoneNumber],
      birthDate: [this.user.birthDate]
    });
  }
}
