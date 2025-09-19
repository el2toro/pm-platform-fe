import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectModel } from '../../models/project-model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7186/api/';

  constructor() {}

  getProjects(): Observable<ProjectModel[]> {
    return this.http.get<ProjectModel[]>(this.baseUrl + 'projects');
  }

  getProjectDetails(projectId: string, tenantId: string): Observable<ProjectModel> {
    // const params = new HttpParams()
    //   .set('projectId', projectId)
    //   .set('tenantId', tenantId);

    return this.http.get<ProjectModel>(`${this.baseUrl}project/${projectId}/${tenantId}`);
  }
}
