import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DragDropModule } from 'primeng/dragdrop';
import { ProgressBar } from "primeng/progressbar";
import { ProjectModel } from '../dashboard-feature/models/project-model';

interface Product {
  id: number;
  name: string;
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

 columns: Column[] = [
    {
      title: 'To Do',
      items: [
        { id: 1, name: 'Feature 1' },
        { id: 2, name: 'UI/UX' },
        { id: 3, name: 'Testing' },
        { id: 4, name: 'Add new module' },
        { id: 5, name: 'SQL query' }
      ]
    },
    {
      title: 'In Progress',
      items: []
    },
    {
      title: 'Testing',
      items: []
    },
    {
      title: 'In Review',
      items: []
    },
    {
      title: 'Done',
      items: []
    }
  ];

  draggedItem?: Product;
  draggedFrom?: Column;

  constructor() { }

  ngOnInit() {
    this.project = new ProjectModel();
    this.project.name = 'Projects from 5 March to 15 March - Sprint 6'
     this.project.description = 'Project Description: Detailed description of the project, its objectives, and expected outcomes.'
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
}
