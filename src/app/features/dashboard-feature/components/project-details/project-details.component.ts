import { Component, OnInit } from '@angular/core';
import { TableModule } from "primeng/table";
import { Button } from "primeng/button";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  standalone: true,
  imports: [TableModule, Button]
})
export class ProjectDetailsComponent implements OnInit {
  projects = <any[]>[];
  constructor() { }

  ngOnInit() {
    this.initProjects();
  }

  initProjects(){
    this.projects  = [
      {name: 'Project Alpha', owner: 'On Track', status: '60', deadline: 'Dec 03, 2025'},
      {name: 'Product Beta', owner: 'At Risk', status: '40', deadline: 'Nov 15, 2025'},
      {name: 'Feature Gamma', owner: 'Delayed', status: '20', deadline: 'Jan 25, 2026'},
      {name: 'Marketing Delta', owner: 'On Track', status: '75', deadline: 'Oct 10, 2025'}
    ]
  }

  getStatusColor(arg0: any) {
throw new Error('Method not implemented.');
}
}
