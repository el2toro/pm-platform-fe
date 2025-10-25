import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TaskStatusPipe } from '../../pipes/task-status.pipe';
import { TaskModel } from '../../models/task-model';
import { TaskService } from '../../apis/task/task.service';

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss'],
   imports: [
    TableModule,
    CommonModule,
    TaskStatusPipe
  ],
})
export class MyTasksComponent implements OnInit {
  private taskService = inject(TaskService);
  tasks = <TaskModel[]>[];

  constructor() { }

  ngOnInit() {
    this.getMyTasks();

    this.taskService.tasks$.subscribe({
      next: (tasks) => this.tasks = tasks
    });
  }

  getMyTasks(){
    this.taskService.getMyTasks().subscribe();
  }
}
