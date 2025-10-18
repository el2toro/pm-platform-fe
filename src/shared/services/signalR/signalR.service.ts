import { inject, Injectable, NgZone } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ProjectModel } from '../../../app/features/dashboard-feature/models/project-model';
import { ProjectService } from '../../../app/features/dashboard-feature/apis/project/project.service';
import { registerTaskHandlers } from './taskHandlers/task-handlers';
import { TaskService } from '../../../app/features/dashboard-feature/apis/task/task.service';
import { registerProjectHandlers } from './projectHandlers/project-handlers';
import { AuthService } from '../../../app/core/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private baseUrl = 'https://localhost:5054/task-service/hub/notifications';
  private taskService = inject(TaskService);
  private authService = inject(AuthService);

  constructor() {}
  private projectService = inject(ProjectService);

  startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl, {
        accessTokenFactory: () => this.authService.accessToken as string,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected ✅'))
      .catch((err) => console.error('SignalR Connection Error ❌', err));

    registerTaskHandlers(this.hubConnection, this.taskService);
    registerProjectHandlers(this.hubConnection, this.projectService);
  }
}
