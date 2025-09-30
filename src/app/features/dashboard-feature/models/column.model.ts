import { TaskModel } from "./task-model";

export class ColumnModel{
    id = '';
    name = '';
    boardId = '';
    tasks = <TaskModel[]>[];
}