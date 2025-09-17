import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../enums/task-status.enum';

@Pipe({
  name: 'taskStatus',
})
export class TaskStatusPipe implements PipeTransform {
  transform(status: number): string {
    let taskStatus = '';

    switch (status) {
      case TaskStatus.Backlog:
        taskStatus = TaskStatus[TaskStatus.Backlog];
        break;

      case TaskStatus.Blocked:
        taskStatus = TaskStatus[TaskStatus.Backlog];
        break;

      case TaskStatus.OnHold:
        taskStatus = TaskStatus[TaskStatus.OnHold];
        break;

      case TaskStatus.InProgress:
        taskStatus = TaskStatus[TaskStatus.InProgress];
        break;

      case TaskStatus.Cancelled:
        taskStatus = TaskStatus[TaskStatus.Cancelled];
        break;

      case TaskStatus.Completed:
        taskStatus = TaskStatus[TaskStatus.Completed];
        break;

      case TaskStatus.ToDo:
        taskStatus = TaskStatus[TaskStatus.ToDo];
        break;

      case TaskStatus.Review:
        taskStatus = TaskStatus[TaskStatus.Review];
        break;

      case TaskStatus.Testing:
        taskStatus = TaskStatus[TaskStatus.Testing];
        break;

      case TaskStatus.Done:
        taskStatus = TaskStatus[TaskStatus.Done];
        break;
    }

    return taskStatus.split(/(?=[A-Z])/).join(' '); // split when an uppercase encoutered
  }
}
