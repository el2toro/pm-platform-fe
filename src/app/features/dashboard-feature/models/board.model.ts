import { ColumnModel } from "./column.model";

export class BoardModel{
    id = '';
    name = '';
    description = '';
    createdBy = '';
    createdAt = '';
    updatedAt = '';
    projectId = '';
    columns = <ColumnModel[]>[];
}