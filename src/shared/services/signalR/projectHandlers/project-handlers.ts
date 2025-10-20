import { HubConnection } from "@microsoft/signalr";
import { ProjectService } from "../../../../app/features/dashboard-feature/apis/project/project.service";

export function registerProjectHandlers(hub: HubConnection, projectService: ProjectService){
    hub.on("ReceiveCreatedProject", (createdProject) =>  projectService.addProject(createdProject));
    hub.on("ReceiveUpdatedProject", (updatedProject) => projectService.updateProject(updatedProject))
}