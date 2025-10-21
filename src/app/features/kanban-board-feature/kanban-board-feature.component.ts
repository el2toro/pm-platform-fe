import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { ProgressBar } from 'primeng/progressbar';
import { TaskStatus } from '../dashboard-feature/enums/task-status.enum';
import { TaskModel } from '../dashboard-feature/models/task-model';
import { SubtaskModel } from '../dashboard-feature/models/subtask-model';
import { AddEditTaskModalComponent } from '../dashboard-feature/components/add-edit-task-modal/add-edit-task-modal.component';
import { TaskService } from '../dashboard-feature/apis/task/task.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ColumnModel } from '../dashboard-feature/models/column.model';
import { Toast } from 'primeng/toast';
import { CustomMessageService } from '../../../shared/services/custom-message.service';
import { BoardModel } from '../dashboard-feature/models/board.model';
import { BoardService } from '../dashboard-feature/apis/board/board.service';
import { EditTaskDialodComponent } from './components/edit-task-dialod/edit-task-dialod.component';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { ProjectModel } from '../dashboard-feature/models/project-model';
import { ActivatedRoute } from '@angular/router';

interface CreateEditTaskModalDto {
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
  imports: [
    CommonModule,
    DragDropModule,
    ProgressBar,
    Toast,
    ButtonModule,
    MenuModule,
  ],
  providers: [DynamicDialogRef],
})
export class KanbanBoardFeatureComponent implements OnInit {
  private taskService = inject(TaskService);
  private dialogService = inject(DialogService);
  private customMessageService = inject(CustomMessageService);
  private boardService = inject(BoardService);
  private activatedRoute = inject(ActivatedRoute);
  private selectedProject!: ProjectModel;
  items: MenuItem[] | undefined;

  board = new BoardModel();
  columns = <ColumnModel[]>[];
  tasks = <TaskModel[]>[];
  projectId!: string;
  

  draggedItem?: TaskModel;
  draggedFrom?: ColumnModel;

  constructor(private ref: DynamicDialogRef<any>) {}

  ngOnInit() {
    this.selectedProject = history.state.project as ProjectModel;
     this.activatedRoute.paramMap.subscribe(params => {
      this.projectId = params.get('projectId')!;
    });
    this.taskService.tasks$.subscribe((tasks) => {
      (this.tasks = tasks), this.mapTasksToColumn();
    });

    this.getBoard();
    this.getTasks();
    this.initMenuItems();
  }

  initMenuItems() {
    this.items = [
      {
        items: [
          {
            id: 'add-column',
            label: 'Add Column',
            icon: 'pi pi-plus',
          },
          {
            id: 'delete-column',
            label: 'Delete Column',
            icon: 'pi pi-times'
          },
        ],
      },
    ];
  }

  onMenuItemClick(event: any) {
    console.log('event: ', event);
  }

  getBoard() {
    this.boardService
    //TODO:  remove this.projectId and add boardId
      .getBoard(this.projectId, this.projectId)
      .subscribe({
        next: (board) => {      
          this.board = board;
          this.columns = board.columns;

          console.log(this.board)
          this.mapTasksToColumn();
        },
        error: (error) =>
          this.customMessageService.showError(
            'Something went wrong while loading the board. Please try again.'
          ),
      });
  }

  getTasks() {
    this.taskService
      .getTasks(this.projectId)
      .subscribe();
  }

  mapTasksToColumn(): void {
    this.columns.forEach((column) => {
      column.tasks = this.filterTasks(column.name);
    });
  }

  filterTasks(columnName: string): TaskModel[] {
    const taskStatus = this.mapColumnNameToTaskStatus(columnName);
    const filteredTasks = this.tasks.filter(
      (task) => task.taskStatus === taskStatus
    );

    return filteredTasks;
  }

  getColumnTaskCount(columnName: string) {
    return this.tasks.filter(
      (task) => task.taskStatus === this.mapColumnNameToTaskStatus(columnName)
    ).length;
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
      //remove from old column
      this.draggedFrom.tasks = this.draggedFrom.tasks?.filter(
        (task) => task.id !== this.draggedItem!.id
      );
      //  add to new column
      targetCol.tasks?.push(this.draggedItem);

      // update task status
      //TODO: map to task status
      let taskStatus = this.mapColumnNameToTaskStatus(targetCol?.name);
      this.draggedItem.taskStatus = taskStatus;

      let taskId = this.draggedItem!.id;

      this.taskService
        .updateTaskStatus(
          this.selectedProject.id,
          taskId,
          taskStatus
        )
        .subscribe();
    }
    this.dragEnd();
  }

  getSubtaskCount(subtasks: SubtaskModel[]): number {
    return subtasks.filter((st) => st.isCompleted).length;
  }

  getTaskProgressValue(subtasks: SubtaskModel[]): number {
    return (this.getSubtaskCount(subtasks) * 100) / subtasks.length;
  }

  getDaysLeft(dueDate: string): number {
    const date =
      (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);

    if (date <= 0) {
      return 0;
    }

    return Math.floor(date);
  }

  openCreateTaskModal(column: ColumnModel) {
    this.ref =
      this.dialogService.open(AddEditTaskModalComponent, {
        width: '600px',
        modal: true,
        data: {
          isCreate: true,
          columnId: column.id,
          projectId: this.board.projectId,
        } as CreateEditTaskModalDto,
      }) ?? new DynamicDialogRef<any>();

    this.ref.onClose.subscribe((result) => {
      if (!result) {
        return;
      }

      result.projectId = this.board.projectId;

      this.taskService.createTask(result).subscribe({
        next: (createdTask) => {
          column?.tasks?.push(createdTask);
          this.customMessageService.showSuccess(
            'New task created successfuly!'
          );
        },
        error: (error) =>
          this.customMessageService.showError(
            `Something went wrong while creating the new task`
          ),
      });
    });
  }

  openTaskUpdateDialog(column: ColumnModel, task: TaskModel) {
    this.ref =
      this.dialogService.open(EditTaskDialodComponent, {
        width: '600px',
        modal: true,
        data: { task: task },
      }) ?? new DynamicDialogRef<any>();

    this.ref.onClose.subscribe((updatedTask) => {
      if (!updatedTask) {
        return;
      }

      this.taskService.updateTask(task).subscribe({
        next: (updatedTask) => {
          this.customMessageService.showSuccess('Task updated successfuly!');
        },
        error: (error) =>
          this.customMessageService.showError(
            `Something went wrong while updating the task`
          ),
      });

      // this.router.navigate(['/task-details', task.id],
      //   {state: { task: task, projectTitle: this.board?.projectName, projectDescription: this.board.projectDescription }});
    });
  }

  deleteTableColumn(columnId: string) {
    //TODO: map task status
    //this.columns = this.columns.filter(col => col.name !== columnTitle);
  }

  //TODO: mapping is not working corectly avoid hard coded cases
  mapColumnNameToTaskStatus(columName: string): TaskStatus {
    switch (columName) {
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
