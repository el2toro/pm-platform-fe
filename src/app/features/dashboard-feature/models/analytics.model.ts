export class AnalyticsModel {
  overdueTasks = 0;
  budgetUsage = 0;
  projectCompletitionRate = 0;
  projectsPendingRate = 0;
  professionals = 0;
  activeProjects = 0;
  pendingProjects = 0;
  projects = <ProjectData[]>[];
  professionalsOfTheDay = <Professional[]>[];
}

export class ProjectData {
  name = '';
  endDate = '';
  progress = 50;
}

export class Professional {
  name = '';
  image = '';
}
