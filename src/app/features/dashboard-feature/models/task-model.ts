import { UserModel } from "../../../core/auth/models/user.model";
import { TaskStatus } from "../enums/task-status.enum";
import { CommentModel } from "./comment-model";
import { SubtaskModel } from "./subtask-model";

export class TaskModel {
    id!: string;
    title!: string;
    description?: string;
    dueDate!: string;
    projectId!: string;
    assignedTo!: string;
    taskStatus!: TaskStatus;
    createdAt!: string;
    updatedAt!: string;
    createdBy!: string;
    updatedBy!: string;
    user!: UserModel;
    subtasks = <SubtaskModel[]>[];
    comments = <CommentModel[]>[];
}
