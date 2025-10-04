import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user-management-feature/services/user.service';

interface Project{
  name: string;
  dueDate: string;
  progress: number;
}

@Component({
  selector: 'app-insight-and-report-feature',
  templateUrl: './insight-and-report-feature.component.html',
  styleUrls: ['./insight-and-report-feature.component.scss'],
  imports: [CommonModule]
})
export class InsightAndReportFeatureComponent implements OnInit {
  private userService = inject(UserService);
  usersCount = 0;

 projects: Project[] = [
  {name: 'Project Alpha Kickoff', dueDate: 'Aug 1, 2025', progress: 40},
  {name: 'Product Beta Launch', dueDate: 'Sep 15, 2025', progress: 60},
  {name: 'Feature Gama Release', dueDate: 'Oct 1, 2025', progress: 25},
  {name: 'Marketing Delta Campaign', dueDate: 'Nov 5, 2025', progress: 82},
  {name: 'UI Zeta Redesign', dueDate: 'Dec 10, 2025', progress: 69},
 ];

 professionals: string[] = ['Mark', 'Delli', 'Geremy', 'Addi', 'Anthony', 'Zocco', 'Mern'];

  constructor() { }

  ngOnInit() {
    this.getUsersCount();
  }

  getUsersCount(){
    this.userService.getUsers().subscribe({
      next: (users) => this.usersCount = users.length
    })
  }

  generateReport(){
    
  }
}
