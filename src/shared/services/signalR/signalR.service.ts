import { inject, Injectable, NgZone } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ProjectModel } from '../../../app/features/dashboard-feature/models/project-model';
import { ProjectService } from '../../../app/features/dashboard-feature/apis/project/project.service';
import { registerTaskHandlers } from './taskHandlers/task-handlers';
import { TaskService } from '../../../app/features/dashboard-feature/apis/task/task.service';
import { registerProjectHandlers } from './projectHandlers/project-handlers';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private baseUrl = 'https://localhost:5054/task-service/hub/notifications';
  private taskService = inject(TaskService);

constructor() { }
private projectService = inject(ProjectService);
private zone = inject(NgZone)

 startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl)
//       .withUrl(`${apiUrl}/hubs/project`, {
//   accessTokenFactory: () => this.authService.getAccessToken()
// })
      .withAutomaticReconnect()
      .build();

        this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected ✅'))
      .catch(err => console.error('SignalR Connection Error ❌', err));

      this.hubConnection.on('ReceiveCreatedTask', (createdTask) => {

        this.zone.run(() => {
        this.taskService.addTask(createdTask)
        console.log('Task  received:', createdTask)
      })});
     

     // registerTaskHandlers(this.hubConnection, this.taskService);
      registerProjectHandlers(this.hubConnection, this.projectService)

    // this.hubConnection.on('ReceiveProjects', (response: ProjectModel) => {
    //   this.zone.run(() => {
    //     this.projectService.addProject(response);
    //     console.log('Projects received:', response);
    //   })
    // });

    // this.hubConnection.on('ReceiveUpdatedProject', (response: ProjectModel) => {
    //   this.zone.run(() => {
    //    // this.projectService.addProject(response);
    //     console.log('Projects received:', response);
    //   })
    // });
    }

}
