import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputText } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { UserModel } from '../../Models/user.mode';
import { UserService } from '../../services/user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddEditUserDialogComponent } from '../add-edit-user-dialog/add-edit-user-dialog.component';
import { CustomMessageService } from '../../../../../shared/services/custom-message.service';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  imports: [
    TableModule,
    InputText,
    IconFieldModule,
    InputIconModule,
    ButtonModule,
  ],
  providers: [DynamicDialogRef]
})
export class UserManagementFeatureComponent implements OnInit {
  private userService = inject(UserService);
  private dialogService = inject(DialogService);
  private dialogRef = inject(DynamicDialogRef);
  private customMessageService = inject(CustomMessageService);
  private authService = inject(AuthService);
  users = <UserModel[]>[];
  filtredUsers = <UserModel[]>[];

  constructor() {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        (this.users = users), (this.filtredUsers = users);
      },
    });
  }

  //TODO: add filter by phone/date
  search(input: HTMLInputElement) {
    let inputText = input.value.toLocaleLowerCase().trim();

    this.filtredUsers = this.users.filter(
      (user) =>
        user.firstName.toLocaleLowerCase().includes(inputText) ||
        user.lastName.toLocaleLowerCase().includes(inputText) ||
        user.email.toLocaleLowerCase().includes(inputText)
    );
  }

  editUser(user: UserModel) {
    this.dialogRef =
      this.dialogService.open(AddEditUserDialogComponent, {
        header: 'Edit User',
        width: '50%',
        modal: true,
        data: {
          user: user,
        },
      }) ?? new DynamicDialogRef();

    this.dialogRef.onClose.subscribe({
      next: (updatedUser: UserModel) => {
        if (!updatedUser) {
          return;
        }

        updatedUser.tenantId = this.authService.tenantId

        this.userService.updateUser(updatedUser).subscribe({
          next: () =>this.customMessageService.showSuccess('User updated successfully')
        });
      },
    });
  }
}
