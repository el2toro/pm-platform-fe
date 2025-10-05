import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { ProgressBar } from "primeng/progressbar";
import { ProjectService } from '../dashboard-feature/apis/project/project.service';
import { TaskStatus } from '../dashboard-feature/enums/task-status.enum';
import { TaskModel } from '../dashboard-feature/models/task-model';
import { SubtaskModel } from '../dashboard-feature/models/subtask-model';
import { AddEditTaskModalComponent } from '../dashboard-feature/components/add-edit-task-modal/add-edit-task-modal.component';
import { TaskService } from '../dashboard-feature/apis/task/task.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { ColumnModel } from '../dashboard-feature/models/column.model';
import { Toast } from "primeng/toast";
import { CustomMessageService } from '../../../shared/services/custom-message.service';
import { BoardModel } from '../dashboard-feature/models/board.model';
import { map } from 'rxjs';
import { BoardService } from '../dashboard-feature/apis/board/board.service';

interface CreateEditTaskModalDto{
  isCreate: boolean;
  columnId: string;
  projectId: string;
  task: TaskModel | null;
}

@Component({
  selector: 'app-kanban-board-feature',
  templateUrl: './kanban-board-feature.component.html',
  styleUrls: ['./kanban-board-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, DragDropModule, ProgressBar, Toast],
  providers: [DynamicDialogRef]
})
export class KanbanBoardFeatureComponent implements OnInit {
  private taskService = inject(TaskService);
  private dialogService = inject(DialogService);
  private projectService = inject(ProjectService);
  private router = inject(Router);
  private customMessageService = inject(CustomMessageService);
  private boardService = inject(BoardService);

  board = new BoardModel();
  columns = <ColumnModel[]>[];
  tasks = <TaskModel[]>[];

  draggedItem?: TaskModel;
  draggedFrom?: ColumnModel;

  constructor(private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.getBoard();
    this.getTasks();
  }

  getBoard(){
    this.boardService.getBoard('66666666-6666-6666-6666-666666666666', '457D38D1-FFDA-4253-80CF-5DE71C171D37')
    .subscribe({
      next: (board) => {this.board = board; this.columns = board.columns},
      error: (error) => this.customMessageService.showError('Something went wrong while loading the board. Please try again.')
    })
  }

  getTasks(){
    this.taskService.getTasks('2F6A892A-40E1-4D88-9E3D-2C12B0F5BDA7')
    .subscribe({
      next: (tasks) => this.tasks = tasks
    })
  }

  getColumnTasks(columnName: string){
    return this.tasks.filter(task => task.taskStatus  === this.mapColumnNameToTaskStatus(columnName))
  }

  getColumnTaskCount(columnName: string){
    return this.tasks.filter(task => task.taskStatus  === this.mapColumnNameToTaskStatus(columnName)).length
  } 

  dragStart(item: TaskModel, from: ColumnModel) {
    this.draggedItem = item;
    this.draggedFrom = from;
  }

  dragEnd() {
    this.draggedItem = undefined;
    this.draggedFrom = undefined;
  }

  onDrop(targetCol: ColumnModel) {
    if (this.draggedItem && this.draggedFrom) {
      // remove from old column
      this.draggedFrom.tasks = this.draggedFrom.tasks?.filter(
        task => task.id !== this.draggedItem!.id
      );
      // add to new column
      targetCol.tasks?.push(this.draggedItem);

      // update task status
      //TODO: map to task status
      let taskStatus = this.mapColumnNameToTaskStatus(targetCol?.name)
      this.draggedItem.taskStatus = taskStatus;

      let taskId = this.draggedItem!.id
 
      this.taskService.updateTaskStatus('2F6A892A-40E1-4D88-9E3D-2C12B0F5BDA7', taskId, taskStatus).subscribe();
    }
    this.dragEnd();
  }

  getSubtaskCount(subtasks: SubtaskModel[]) : number{
    return subtasks.filter(st => st.isCompleted).length
  }

  getTaskProgressValue(subtasks: SubtaskModel[]) : number{
    return (this.getSubtaskCount(subtasks) * 100) / subtasks.length;
  }

  getDaysLeft(dueDate: string) : number{
    const date = (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);

    if(date <= 0) { return 0 }

    return Math.floor(date)
  }

  openCreateTaskModal(columnId: string) {
      this.ref = this.dialogService.open(AddEditTaskModalComponent, {
        width: '600px',
        modal: true,
        data: {isCreate: true, columnId: columnId, projectId: this.board.projectId} as CreateEditTaskModalDto,
      });
  
      this.ref.onClose.subscribe((result) => {
        if (!result) {
          return;
        }
  
        result.projectId = this.board.projectId;
  
        this.taskService.createTask(result).subscribe({
         next: () => this.getBoard(), //TODO: call reload task not board
         error: (error) => this.customMessageService.showError(`Something went wrong! Error: ${error.message}`)
        });
      });
    }

    openTaskDetailsPage(task: TaskModel){
      this.router.navigate(['/task-details', task.id], 
        {state: { task: task, projectTitle: this.board?.projectName, projectDescription: this.board.projectDescription }});
    }

    deleteTableColumn(columnTitle: TaskStatus) {
      //TODO: map task status
      //this.columns = this.columns.filter(col => col.name !== columnTitle);
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
