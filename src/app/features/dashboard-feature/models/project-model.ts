import { UserModel } from "../../../core/auth/models/user.model";
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
  progress = 0;
  team!: UserModel[];
  tasks!:  TaskModel[];
}
