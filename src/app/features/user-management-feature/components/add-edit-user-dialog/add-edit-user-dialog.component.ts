import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserModel } from '../../Models/user.mode';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-edit-user-dialog',
  templateUrl: './add-edit-user-dialog.component.html',
  styleUrls: ['./add-edit-user-dialog.component.scss'],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class AddEditUserDialogComponent implements OnInit {
  private dynamicDialogRef = inject(DynamicDialogRef);
  private dynamicDialogConfig = inject(DynamicDialogConfig);
  private user: UserModel = this.dynamicDialogConfig.data.user;
  form!: FormGroup;
  buttonDisabled = true;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      firstName: [this.user.firstName],
      lastName: [this.user.lastName],
      email: [this.user.email],
      phoneNumber: [this.user.phoneNumber],
      birthDate: [this.user.birthDate],
    });

    this.form.valueChanges.subscribe(() => {
      this.buttonDisabled = false;
    })
  }

  save() {
    if (this.form.valid) {
      const updatedUser = { ...this.user, ...this.form.value };
      this.dynamicDialogRef.close(updatedUser);
    }
  }

  cancel() {
    this.dynamicDialogRef.close();
  }
}
