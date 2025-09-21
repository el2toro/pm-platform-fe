import { Routes } from '@angular/router';
import { OverviewComponent } from './features/dashboard-feature/components/overview/overview.component';
import { ProjectDetailsComponent } from './features/dashboard-feature/components/project-details/project-details.component';
import { InsightAndReportFeatureComponent } from './features/insight-and-report-feature/insight-and-report-feature.component';
import { KanbanBoardFeatureComponent } from './features/kanban-board-feature/kanban-board-feature.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { 
        path: 'login', 
        component: LoginComponent
    },
    { 
        path: 'dashboard', 
        component: OverviewComponent,
        canActivate: [AuthGuard] 
    },
    { path: 'project-details', component: ProjectDetailsComponent },
    { path: 'reports', component: InsightAndReportFeatureComponent },
    { path: 'board', component: KanbanBoardFeatureComponent },
    { path: '**', redirectTo: 'login' }
];
