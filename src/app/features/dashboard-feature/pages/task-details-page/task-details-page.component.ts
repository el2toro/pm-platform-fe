import { Component, OnInit } from '@angular/core';
import { TaskStatusPipe } from './../../pipes/task-status.pipe';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../../models/task-model';
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-task-details-page',
  templateUrl: './task-details-page.component.html',
  styleUrls: ['./task-details-page.component.scss'],
  standalone: true,
  imports: [TaskStatusPipe, CommonModule, TableModule],
})
export class TaskDetailsPageComponent implements OnInit {
  projectTitle = '';
  projectDescription = '';
  task = new TaskModel(); 

  constructor() { }

  ngOnInit() {
    this.projectTitle = history.state.projectTitle;
    this.projectDescription = history.state.projectDescription;
    this.task = history.state.task;
  }

}
