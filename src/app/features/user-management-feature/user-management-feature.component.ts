import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from './services/user.service';
import { UserModel } from './Models/user.mode';
import { InputText } from "primeng/inputtext";
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-user-management-feature',
  templateUrl: './user-management-feature.component.html',
  styleUrls: ['./user-management-feature.component.scss'],
  imports: [TableModule, InputText, IconFieldModule, InputIconModule, ButtonModule]
})
export class UserManagementFeatureComponent implements OnInit {
  private userService = inject(UserService);
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
}
