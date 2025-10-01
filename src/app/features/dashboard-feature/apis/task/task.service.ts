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
  private baseUrl = 'https://localhost:7186/api/tasks';

  createTask(task: TaskModel): Observable<any> {
    return this.httpClient.post<any>(this.baseUrl, task);
  }

  updateTask(task: TaskModel): Observable<any> {
    return this.httpClient.put<any>(this.baseUrl, task);
  }

  deleteTask(taskId: TaskModel): Observable<any> {
    const params = new HttpHeaders();
    params.append('taskId', taskId.toString());
    return this.httpClient.delete<any>(this.baseUrl, { headers: params });
  }

  updateTaskStatus(taskId: string, columnId: string, status: TaskStatus): Observable<any> {
    const url = `${this.baseUrl}/status`;
    // const params = new HttpParams()
    //   .set('taskId', taskId)
    //   .set('status', status);
    return this.httpClient.patch<any>(url, { taskId: taskId, columnId: columnId, status: status });
  }
}
