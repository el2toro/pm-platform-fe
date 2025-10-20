import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TaskModel } from '../../models/task-model';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { TaskStatus } from '../../enums/task-status.enum';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  constructor() {}
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);
  private baseUrl = `https://localhost:5054/task-service/tenants`;
  private tasksSubject = new BehaviorSubject<TaskModel[]>([]);
  public tasks$ = this.tasksSubject.asObservable();
 
  addTask(task: TaskModel) : void{
    const updated = [...this.tasksSubject.value, task];
    this.tasksSubject.next(updated);
  }

  setTasks(tasks: TaskModel[]): void{
    this.tasksSubject.next(tasks);
  }

   //TODO: rename methods acordingly, because aren't distinctible
  taskUpdate(updatedTask: TaskModel){
    const currentTasks = this.tasksSubject.getValue();
    const newTasks = currentTasks.map(task => task.id === updatedTask.id ? {...task, ...updatedTask} : task);

    this.tasksSubject.next(newTasks);
  }

removeTask(taskId: string){
   const currentTasks = this.tasksSubject.getValue();
   const newTasks = currentTasks.filter(t => t.id !== taskId);

   this.tasksSubject.next(newTasks);
}

  createTask(task: TaskModel): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/${this.authService.tenantId}/projects/${task.projectId}/tasks`, task);
  }

  updateTask(task: TaskModel): Observable<any> {
    return this.httpClient.put<any>(`${this.baseUrl}/${this.authService.tenantId}/projects/${task.projectId}/tasks`, task);
  }

  deleteTask(projectId: string,  taskId: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${this.authService.tenantId}/projects/${projectId}/tasks/${taskId}`);
  }

  updateTaskStatus(projectId: string, taskId: string, status: TaskStatus): Observable<any> {
    const url = `${this.baseUrl}/${this.authService.tenantId}/projects/${projectId}/tasks/${taskId}/status`;
    // const params = new HttpParams()
    //   .set('taskId', taskId)
    //   .set('status', status);
    return this.httpClient.patch<any>(url, { projectId: projectId, taskId: taskId, status: status });
  }

  getTasks(projectId: string){
    return this.httpClient.get<TaskModel[]>(`${this.baseUrl}/${this.authService.tenantId}/projects/${projectId}/tasks`)
    .pipe(
      map(tasks => this.tasksSubject.next(tasks)) 
    );
  }
}
