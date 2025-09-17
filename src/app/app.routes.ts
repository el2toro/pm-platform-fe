import { Routes } from '@angular/router';
import { OverviewComponent } from './features/dashboard-feature/components/overview/overview.component';
import { ProjectDetailsComponent } from './features/dashboard-feature/components/project-details/project-details.component';

export const routes: Routes = [
    { path: 'dashboard', component: OverviewComponent },
    { path: 'project-details', component: ProjectDetailsComponent },
];
