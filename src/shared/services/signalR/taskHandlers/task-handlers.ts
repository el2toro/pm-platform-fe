import { HubConnection } from "@microsoft/signalr";
import { TaskService } from "../../../../app/features/dashboard-feature/apis/task/task.service";

export function registerTaskHandlers(hub: HubConnection, taskService:TaskService ){
   hub.on("ReceiveCreatedTask", (createdTask) => taskService.addTask(createdTask));
   hub.on("ReceiveUpdatedTask", (updatedTask) => taskService.taskUpdate(updatedTask));
   hub.on("ReceiveTaskAssignee", (updatedTask) => { console.log("Task assignee updated", updatedTask)});
}