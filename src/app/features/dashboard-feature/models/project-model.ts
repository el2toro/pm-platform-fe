import { TaskModel } from "./task-model";

export class ProjectModel {
  id = '';
  tenantId = '';
  name = '';
  description = '';
  createdAt = '';
  createdBy = '';
  projectStatus = 0;
  endDate = '';
  tasks!:  TaskModel[];
}
