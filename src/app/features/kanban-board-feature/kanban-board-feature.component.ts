import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { ProgressBar } from "primeng/progressbar";
import { ProjectModel } from '../dashboard-feature/models/project-model';
import { ProjectService } from '../dashboard-feature/apis/project/project.service';
import { TaskStatus } from '../dashboard-feature/enums/task-status.enum';
import { TaskModel } from '../dashboard-feature/models/task-model';
import { map } from 'rxjs';
import { SubtaskModel } from '../dashboard-feature/models/subtask-model';

interface Product {
  id: string;
  name: string;
  dueDate: Date;
  subtasks: SubtaskModel[]
}

interface Column {
  title: string;
  items: Product[];
}

@Component({
  selector: 'app-kanban-board-feature',
  templateUrl: './kanban-board-feature.component.html',
  styleUrls: ['./kanban-board-feature.component.scss'],
  standalone: true,
  imports: [CommonModule, DragDropModule, ProgressBar]
})
export class KanbanBoardFeatureComponent implements OnInit {
  project!: ProjectModel;
 columns = <Column[]>[];

  draggedItem?: Product;
  draggedFrom?: Column;

  constructor(private projectService: ProjectService) { }

  ngOnInit() {
    this.initProject();
  }

  initProject(){
    this.projectService.getProjectDetails('8D4B5374-47DA-4900-BEDA-E3AA9D46E5B6', 'FF2C542E-5948-4726-A28A-4A5FD5CB76DA')
    .subscribe({
      next: (project: ProjectModel) => {
        this.project = project, this.initColumn(this.project.tasks)
      }
    })
  }

  dragStart(item: Product, from: Column) {
    this.draggedItem = item;
    this.draggedFrom = from;
  }

  dragEnd() {
    this.draggedItem = undefined;
    this.draggedFrom = undefined;
  }

  onDrop(targetCol: Column) {
    if (this.draggedItem && this.draggedFrom) {
      // remove from old column
      this.draggedFrom.items = this.draggedFrom.items.filter(
        p => p.id !== this.draggedItem!.id
      );
      // add to new column
      targetCol.items.push(this.draggedItem);
    }
    this.dragEnd();
  }

  initColumn(tasks: TaskModel[]){
    this.columns = [
    {
      title: 'To Do',
      items: this.mapColumnItems(tasks, TaskStatus.ToDo)
    },
    {
      title: 'In Progress',
      items: this.mapColumnItems(tasks, TaskStatus.InProgress)
    },
    {
      title: 'Testing',
      items: this.mapColumnItems(tasks, TaskStatus.Testing)
    },
    {
      title: 'In Review',
      items: this.mapColumnItems(tasks, TaskStatus.Review)
    },
    {
      title: 'Done',
      items: this.mapColumnItems(tasks, TaskStatus.Done)
    }
    ]
  }

  mapColumnItems(tasks: TaskModel[], status: TaskStatus){
   return tasks.filter(task => task.taskStatus === status)
    .map(task => { 
      return {id: task.id, name: task.title, dueDate: task.dueDate, subtasks: task.subtasks}});
  }

  getSubtaskCount(subtasks: SubtaskModel[]) : number{
    return subtasks.filter(st => st.isCompleted).length
  }

  getTaskProgressValue(subtasks: SubtaskModel[]) : number{
    return (this.getSubtaskCount(subtasks) * 100) / subtasks.length;
  }

  getDaysLeft(dueDate: Date) : number{
    const date = (new Date(dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24);

    if(date <= 0) { return 0 }

    return Math.floor(date)
  }
}
