import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectModel } from '../../models/project-model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7186/api/';

constructor() { }

getProjects() : Observable<ProjectModel[]>{
  return this.http.get<ProjectModel[]>(this.baseUrl + 'projects');
}

}
