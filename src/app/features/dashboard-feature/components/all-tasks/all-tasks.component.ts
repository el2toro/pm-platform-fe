import { Component, inject, OnInit } from '@angular/core';
import { TaskModel } from '../../models/task-model';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { TaskService } from '../../apis/task/task.service';

@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss'],
  imports: [
    TableModule,
    CommonModule,
    TaskStatusPipe
  ],
})
export class AllTasksComponent implements OnInit {
  private taskService = inject(TaskService);
  tasks = <TaskModel[]>[];

  constructor() { }

  ngOnInit() {
    this.getAllTasks();

    this.taskService.tasks$.subscribe({
      next: (tasks) => this.tasks = tasks
    });
  }

  getAllTasks(){
    this.taskService.getAllTasks().subscribe();
  }
}
