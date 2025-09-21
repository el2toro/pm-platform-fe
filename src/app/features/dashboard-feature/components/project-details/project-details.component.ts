import { Component, OnInit } from '@angular/core';
import { TableModule } from "primeng/table";
import { ActivatedRoute, Route } from '@angular/router';
import { ProjectService } from '../../apis/project/project.service';
import { ProjectModel } from '../../models/project-model';
import { CommonModule } from '@angular/common';
import { TaskModel } from '../../models/task-model';
import { TaskStatusPipe } from "../../pipes/task-status.pipe";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  standalone: true,
  imports: [TableModule, CommonModule, TaskStatusPipe]
})
export class ProjectDetailsComponent implements OnInit {
  tasks = <TaskModel[]>[];
  projectId!: string;
  tenantId!: string;
  project!: ProjectModel;

  constructor(private route: ActivatedRoute, 
    private projectService: ProjectService) { }

  ngOnInit() {
    this.getParams();
    this.getProjectDetails();
  }

  getParams(){
    this.route.queryParams.subscribe({
      next: (params) => {
        this.projectId = params['projectId'];
        this.tenantId = params['tenantId'];
      }
    });
  }

  getProjectDetails(){
    this.projectService.getProjectDetails(this.projectId, this.tenantId).subscribe({
      next: (project) => { 
        this.project = project;
        this.tasks = project.tasks
      }
    })
  }

  getStatusColor(arg0: any) {
throw new Error('Method not implemented.');
}
}
