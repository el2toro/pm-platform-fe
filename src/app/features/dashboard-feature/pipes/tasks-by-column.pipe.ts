import { Pipe, PipeTransform } from '@angular/core';
import { TaskModel } from '../models/task-model';
import { TaskStatus } from '../enums/task-status.enum';

@Pipe({
  name: 'tasksByColumn'
})
export class TasksByColumnPipe implements PipeTransform {

  transform(tasks: TaskModel[] | null, columnName: string): any {
    console.log('it filters by: ', columnName)
    return tasks?.filter(task => task.taskStatus  === this.mapColumnNameToTaskStatus(columnName))
  }

  //TODO: mapping is not working corectly avoid hard coded cases
      mapColumnNameToTaskStatus(columName: string) : TaskStatus{
        switch(columName){
          case 'In Progress':
            return TaskStatus.InProgress;
            case 'To Do':
            return TaskStatus.ToDo;
            case 'Done':
            return TaskStatus.Done;
            case 'Testing':
            return TaskStatus.Testing;
            case 'Review':
            return TaskStatus.Review;
        }
  
        return TaskStatus.Backlog;
      }
}
