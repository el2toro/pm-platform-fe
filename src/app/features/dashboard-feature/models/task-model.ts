import { TaskStatus } from "../enums/task-status.enum";
import { SubtaskModel } from "./subtask-model";

export class TaskModel {
    id!: string;
    title!: string;
    description?: string;
    dueDate!: Date;
    projectId!: string;
    assignedTo!: string;
    taskStatus!: TaskStatus;
    createdAt!: Date;
    updatedAt!: Date;
    createdBy!: string;
    updatedBy!: string;
    subtasks!: SubtaskModel[];
}
