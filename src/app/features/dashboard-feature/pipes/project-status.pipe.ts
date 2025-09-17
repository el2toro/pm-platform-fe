import { Pipe, PipeTransform } from '@angular/core';
import { ProjectStatus as ProjectStatus } from '../enums/project-status.enum';

@Pipe({
  name: 'projectStatus'
})
export class ProjectStatusPipe implements PipeTransform {

  transform(status: number): string {
    let projectStatus = '';
    
    switch(status){
      case ProjectStatus.NotStarted: 
        projectStatus = ProjectStatus[ProjectStatus.NotStarted];
        break;

      case ProjectStatus.Pending:
        projectStatus = ProjectStatus[ProjectStatus.Pending];
        break;

      case ProjectStatus.OnHold:
        projectStatus = ProjectStatus[ProjectStatus.OnHold];
        break; 
      
       case ProjectStatus.InProgress:
        projectStatus = ProjectStatus[ProjectStatus.InProgress];
        break;
      
      case ProjectStatus.Cancelled:
        projectStatus = ProjectStatus[ProjectStatus.Cancelled];
        break; 
        
      case ProjectStatus.Completed:
        projectStatus = ProjectStatus[ProjectStatus.Completed];
        break;  
    }
    return projectStatus.split(/(?=[A-Z])/).join(" "); // split when an uppercase encoutered
  }
}
