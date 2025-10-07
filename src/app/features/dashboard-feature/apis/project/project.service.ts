import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectModel } from '../../models/project-model';
import { BoardModel } from '../../models/board.model';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private baseUrl = `https://localhost:5054/project-service/tenants/${this.authService.tenantId}/projects`;

  private projectsSubject = new BehaviorSubject<ProjectModel[]>([]);
  public projects$ = this.projectsSubject.asObservable();

  constructor() {}

  get currentProjects(): ProjectModel[] {
    return this.projectsSubject.value;
  }

  addProject(newProject: ProjectModel): void {
    const updated = [...this.projectsSubject.value, newProject];
    this.projectsSubject.next(updated);
  }

  setProjects(projects: ProjectModel[]): void {
    this.projectsSubject.next(projects);
  }

  getProjects(pageNumber: number, pageSize: number): Observable<any> {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    return this.http.get<any>(`${this.baseUrl}`, { params: params } );
  }

  getProjectDetails(projectId: string, tenantId: string): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(
      `${this.baseUrl}/${projectId}/${tenantId}`
    );
  }

   getBoard(projectId: string): Observable<BoardModel> {
    return this.http.get<BoardModel>(`${this.baseUrl}/${projectId}/board`);
  }

  createProject(project: any) {
    return this.http.post(this.baseUrl, project);
  }

  editProject(project: any) {
    return this.http.put(this.baseUrl, project);
  }
}
