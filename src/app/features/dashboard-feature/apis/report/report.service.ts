import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AnalyticsModel } from '../../models/analytics.model';
import { AuthService } from '../../../../core/auth/services/auth.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  private httpClient = inject(HttpClient);
  private authService = inject(AuthService);
  private baseUrl = `https://localhost:5054/analytics-service/tenants`;
  private analyticsSubject = new BehaviorSubject<AnalyticsModel>(new AnalyticsModel());
  public analytics$ = this.analyticsSubject.asObservable();
 
 get analyticsData(){
  return this.analyticsSubject.value;
 }
 
  constructor() {}

  setAnalytics(analytics: AnalyticsModel){
    this.analyticsSubject.next(analytics);
  }

  getAnalytics(): Observable<AnalyticsModel> {
    return this.httpClient.get<AnalyticsModel>(`${this.baseUrl}/${this.authService.tenantId}/analytics`);
  }

  getReport(name: string, description: string): Observable<Blob> {
    return this.httpClient.post<Blob>(`${this.baseUrl}/${this.authService.tenantId}/report`, 
      { name: name, description: description },
       { responseType: 'blob' as 'json' });
  }
}
