import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProjectModel } from '../../models/project-model';
import { AuthService } from '../../../../core/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private baseUrl = `https://localhost:5054/project-service/tenants`;

  private projectsSubject = new BehaviorSubject<ProjectModel[]>([]);
  public projects$ = this.projectsSubject.asObservable();

  constructor() {}

  addProject(newProject: ProjectModel): void {
    const updated = [...this.projectsSubject.value, newProject];
    this.projectsSubject.next(updated);
  }

   updateProject(updatedProject: ProjectModel): void {
    const currentProjects = this.projectsSubject.getValue();
    const updatedProjects = currentProjects.map(project => project.id === updatedProject.id ? {...project, ...updatedProject} : project);
    this.projectsSubject.next(updatedProjects);
  }

  setProjects(projects: ProjectModel[]): void {
    this.projectsSubject.next(projects);
  }

  getProjects(pageNumber: number, pageSize: number): Observable<any> { 
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber);
    params = params.append('pageSize', pageSize);

    return this.http.get<any>(`${this.baseUrl}/${this.authService.tenantId}/projects`, { params: params } );
  }

  getProjectDetails(projectId: string, tenantId: string): Observable<ProjectModel> {
    return this.http.get<ProjectModel>(
      `${this.baseUrl}/${tenantId}/projects/${projectId}`
    );
  }

  createProject(project: any) {
    return this.http.post(`${this.baseUrl}/${this.authService.tenantId}/projects`, project);
  }

  editProject(project: any) {
    return this.http.put(`${this.baseUrl}/${this.authService.tenantId}/projects`, project);
  }
}
