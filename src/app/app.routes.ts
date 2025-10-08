import { Routes } from '@angular/router';
import { OverviewComponent } from './features/dashboard-feature/components/overview/overview.component';
import { ProjectDetailsComponent } from './features/dashboard-feature/components/project-details/project-details.component';
import { InsightAndReportFeatureComponent } from './features/insight-and-report-feature/insight-and-report-feature.component';
import { KanbanBoardFeatureComponent } from './features/kanban-board-feature/kanban-board-feature.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { UserGuard } from './core/guards/user.guard';
import { TaskDetailsPageComponent } from './features/dashboard-feature/pages/task-details-page/task-details-page.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { ProfileFeatureComponent } from './features/profile-feature/profile-feature.component';
import { UserManagementFeatureComponent } from './features/user-management-feature/components/user-management/user-management.component';

export const routes: Routes = [
    { 
        path: 'login', 
        component: LoginComponent,
        canActivate: [UserGuard]
    },
    { 
        path: 'register', 
        component: RegisterComponent,
        canActivate: [UserGuard]
    },
    { 
        path: 'dashboard', 
        component: OverviewComponent,
        canActivate: [AuthGuard] 
    },
    { path: 'project-details', component: ProjectDetailsComponent },
    { path: 'reports', component: InsightAndReportFeatureComponent },
    { path: 'board', component: KanbanBoardFeatureComponent },
    { path: 'task-details/:taskId', component: TaskDetailsPageComponent },
    { path: 'team-management', component: UserManagementFeatureComponent},
    { path: 'profile', component: ProfileFeatureComponent},
    { path: '**', redirectTo: 'login' }
];
