import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputText } from "primeng/inputtext";
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';
import { UserModel } from '../../Models/user.mode';
import { UserService } from '../../services/user.service';
import { DialogService } from 'primeng/dynamicdialog';
import { AddEditProjectModalComponent } from '../../../dashboard-feature/components/add-edit-project-modal/add-edit-project-modal.component';
import { AddEditUserDialogComponent } from '../add-edit-user-dialog/add-edit-user-dialog.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  imports: [TableModule, InputText, IconFieldModule, InputIconModule, ButtonModule]
})
export class UserManagementFeatureComponent implements OnInit {
  private userService = inject(UserService);
  private dialogService = inject(DialogService);
  users = <UserModel[]>[];
  filtredUsers = <UserModel[]>[];

  constructor() { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
   this.userService.getUsers().subscribe({
    next: (users) => {this.users = users, this.filtredUsers = users }
   })
  }

  //TODO: add filter by phone/date
  search(input: HTMLInputElement){
    let inputText = input.value.toLocaleLowerCase().trim()

   this.filtredUsers = this.users.filter(user => 
    user.firstName.toLocaleLowerCase().includes(inputText) || 
    user.lastName.toLocaleLowerCase().includes(inputText) || 
    user.email.toLocaleLowerCase().includes(inputText))
  }

  editUser(user: UserModel){
    this.dialogService.open(AddEditUserDialogComponent, {
      header: 'Edit User',
      width: '50%',
      data: {
        user: user
      }
    });
  }
}
