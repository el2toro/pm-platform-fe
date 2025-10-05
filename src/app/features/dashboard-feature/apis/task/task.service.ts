import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TaskModel } from '../../models/task-model';
import { Observable } from 'rxjs';
import { TaskStatus } from '../../enums/task-status.enum';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}
  private httpClient = inject(HttpClient);
  private baseUrl = 'https://localhost:5054/task-service';

  createTask(task: TaskModel): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/project/${task.projectId}/tasks`, task);
  }

  updateTask(task: TaskModel): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/project/${task.projectId}/tasks`, task);
  }

  deleteTask(projectId: string,  taskId: TaskModel): Observable<any> {
    const params = new HttpHeaders();
    params.append('taskId', taskId.toString());
    return this.httpClient.delete<any>(`${this.baseUrl}/project/${projectId}/tasks`, { headers: params });
  }

  updateTaskStatus(projectId: string, taskId: string, status: TaskStatus): Observable<any> {
    const url = `${this.baseUrl}/project/${projectId}/tasks/${taskId}/status`;
    // const params = new HttpParams()
    //   .set('taskId', taskId)
    //   .set('status', status);
    return this.httpClient.patch<any>(url, { projectId: projectId, taskId: taskId, status: status });
  }

  getTasks(projectId: string){
    return this.httpClient.get<TaskModel[]>(`${this.baseUrl}/project/${projectId}/tasks`);
  }
}
