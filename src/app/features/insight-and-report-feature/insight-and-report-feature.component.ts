import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../user-management-feature/services/user.service';
import { ReportService } from '../dashboard-feature/apis/report/report.service';
import { AnalyticsModel } from '../dashboard-feature/models/analytics.model';
import { saveAs } from 'file-saver';
import { FormsModule } from "@angular/forms";

interface Project{
  name: string;
  dueDate: string;
  progress: number;
}

@Component({
  selector: 'app-insight-and-report-feature',
  templateUrl: './insight-and-report-feature.component.html',
  styleUrls: ['./insight-and-report-feature.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class InsightAndReportFeatureComponent implements OnInit {
  private reportService = inject(ReportService);

  analytics = new AnalyticsModel();
  reportName = '';
  reportDescription = '';

  constructor() { }

  ngOnInit() {
    this.getAnalytics();
    //TODO: add to a method
    this.reportService.analytics$.subscribe(analytics => this.analytics = analytics);
  }


  generateReport(){
    this.reportService.getReport(this.reportName, this.reportDescription).subscribe({
      next: (blob) => saveAs(blob, `report.pdf`)
    })
  }

  getAnalytics(){
    this.reportService.getAnalytics().subscribe({
      next: (analytics) => this.reportService.setAnalytics(analytics)
    })
  }
}
