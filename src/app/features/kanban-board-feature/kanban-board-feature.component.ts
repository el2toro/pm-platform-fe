import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { ProgressBar } from "primeng/progressbar";
import { ProjectModel } from '../dashboard-feature/models/project-model';
import { ProjectService } from '../dashboard-feature/apis/project/project.service';
import { TaskStatus } from '../dashboard-feature/enums/task-status.enum';
import { TaskModel } from '../dashboard-feature/models/task-model';
import { SubtaskModel } from '../dashboard-feature/models/subtask-model';
import { AddEditTaskModalComponent } from '../dashboard-feature/components/add-edit-task-modal/add-edit-task-modal.component';
import { TaskService } from '../dashboard-feature/apis/task/task.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { TaskStatusPipe } from "../dashboard-feature/pipes/task-status.pipe";
import { ColumnModel } from '../dashboard-feature/models/column.model';

interface Column {
  title: TaskStatus;
  items: TaskModel[];
}

@Component({
  selector: 'app-kanban-board-feature',
  templateUrl: './kanban-board-feature.component.html',
  styleUrls: ['./kanban-board-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, DragDropModule, ProgressBar, TaskStatusPipe],
  providers: [DynamicDialogRef]
})
export class KanbanBoardFeatureComponent implements OnInit {
  private taskService = inject(TaskService);
  private dialogService = inject(DialogService);
  private projectService = inject(ProjectService);
  private router = inject(Router);

  project = new ProjectModel();
  columns = <ColumnModel[]>[];

  draggedItem?: TaskModel;
  draggedFrom?: ColumnModel;

  constructor(private ref: DynamicDialogRef) { }

  ngOnInit() {
    //this.initProject();
    this.initBoard();
  }

  initProject(){
    this.projectService.getProjectDetails('8D4B5374-47DA-4900-BEDA-E3AA9D46E5B6', 'FF2C542E-5948-4726-A28A-4A5FD5CB76DA')
    .subscribe({
      next: (project: ProjectModel) => {
        //TODO: use tap/map ??
       // this.project = project, this.initColumn(this.project.tasks)
      }
    })
  }

  initBoard(){
    this.projectService.getBoard('11111111-1111-1111-1111-111111111111').subscribe({
      next: (board) => {console.log(board), this.columns = board.columns}
    })
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
      this.draggedFrom.tasks = this.draggedFrom.tasks.filter(
        task => task.id !== this.draggedItem!.id
      );
      // add to new column
      targetCol.tasks.push(this.draggedItem);

      // update task status
      //TODO: map to task status
      //this.draggedItem.taskStatus = targetCol?.name as TaskStatus;
      console.log(this.draggedItem);
     // this.taskService.updateTaskStatus(this.draggedItem!.id, targetCol?.name).subscribe();
    }
    this.dragEnd();
  }

  // initColumn(tasks: TaskModel[]){
  //   this.columns = [
  //     {
  //     title: TaskStatus.Backlog,
  //     items: this.mapColumnItems(tasks, TaskStatus.Backlog)
  //   },
  //   {
  //     title: TaskStatus.ToDo,
  //     items: this.mapColumnItems(tasks, TaskStatus.ToDo)
  //   },
  //   {
  //     title: TaskStatus.InProgress,
  //     items: this.mapColumnItems(tasks, TaskStatus.InProgress)
  //   },
  //   {
  //     title: TaskStatus.Testing,
  //     items: this.mapColumnItems(tasks, TaskStatus.Testing)
  //   },
  //   {
  //     title: TaskStatus.Review,
  //     items: this.mapColumnItems(tasks, TaskStatus.Review)
  //   },
  //   {
  //     title: TaskStatus.Done,
  //     items: this.mapColumnItems(tasks, TaskStatus.Done)
  //   }
  //   ]
  // }

  mapColumnItems(tasks: TaskModel[], status: TaskStatus){
   return tasks.filter(task => task.taskStatus === status)
    .map(task => task);
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

  openCreateTaskModal() {
      this.ref = this.dialogService.open(AddEditTaskModalComponent, {
        width: '600px',
        modal: true,
        data: null,
      });
  
      this.ref.onClose.subscribe((result) => {
        if (!result) {
          return;
        }
  
        result.projectId = this.project.id;
  
        this.taskService.createTask(result).subscribe({
         next: () => this.initProject(),
        });
      });
    }

    openTaskDetailsPage(taskId: string){
      const task = this.project.tasks.find(t => t.id === taskId);
      this.router.navigate(['/task-details', taskId], 
        {state: { task: task, projectTitle: this.project?.name, projectDescription: this.project.description }});
    }

    deleteTableColumn(columnTitle: TaskStatus) {
      //TODO: map task status
      //this.columns = this.columns.filter(col => col.name !== columnTitle);
    }
}
