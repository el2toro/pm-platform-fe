import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserService } from './services/user.service';
import { UserModel } from './Models/user.mode';
import { InputText } from "primeng/inputtext";
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-user-management-feature',
  templateUrl: './user-management-feature.component.html',
  styleUrls: ['./user-management-feature.component.scss'],
  imports: [TableModule, InputText, IconFieldModule, InputIconModule]
})
export class UserManagementFeatureComponent implements OnInit {
  private userService = inject(UserService);
  users = <UserModel[]>[];
  searchText = '';

  constructor() { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(){
   this.userService.getUsers().subscribe({
    next: (users) => this.users = users 
   })
  }

  search(){
    console.log(this.searchText)
   // this.users = this.users.filter(this.userService.firstName)
  }
}
