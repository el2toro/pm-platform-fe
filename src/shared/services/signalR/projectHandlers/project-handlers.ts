import { HubConnection } from "@microsoft/signalr";
import { ProjectService } from "../../../../app/features/dashboard-feature/apis/project/project.service";

export function registerProjectHandlers(hub: HubConnection, projectService: ProjectService){
    hub.on("ReceiveProjects", (project) =>  projectService.addProject(project));
    //hub.on("ReceiveUpdatedProject", (updatedProject) => projectService.u)
}