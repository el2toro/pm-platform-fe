import { inject, Injectable, NgZone } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ProjectModel } from '../../../app/features/dashboard-feature/models/project-model';
import { ProjectService } from '../../../app/features/dashboard-feature/apis/project/project.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection!: signalR.HubConnection;
  private baseUrl = 'https://localhost:5054/project-service/hub/project';

constructor() { }
private projectService = inject(ProjectService);
private zone = inject(NgZone)

 startConnection(): void {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(this.baseUrl)
      .withAutomaticReconnect()
      .build();

        this.hubConnection
      .start()
      .then(() => console.log('SignalR Connected ✅'))
      .catch(err => console.error('SignalR Connection Error ❌', err));

    this.hubConnection.on('ReceiveProjects', (response: ProjectModel) => {
      this.zone.run(() => {
        this.projectService.addProject(response);
        console.log('Projects received:', response);
      })
    });

    this.hubConnection.on('ReceiveUpdatedProject', (response: ProjectModel) => {
      this.zone.run(() => {
       // this.projectService.addProject(response);
        console.log('Projects received:', response);
      })
    });
    }

}
