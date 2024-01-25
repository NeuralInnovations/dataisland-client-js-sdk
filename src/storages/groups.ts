import { AccessGroupDto, PermitsDto } from "../dto/accessGroupResponse"
import { WorkspaceDto } from "../dto/workspacesResponse"
import { EventDispatcher } from "../events"

export type GroupId = string

export enum GroupEvent {
    ADDED = "added",
    REMOVED = "removed",
    UPDATED = "updated"
  }

export abstract class Group {

    abstract get id(): GroupId

    abstract get group(): AccessGroupDto

    abstract get workspaces(): WorkspaceDto[]

    abstract set workspaces(value: string[])

    abstract set name(value: string)

    abstract set permits(value: PermitsDto[])
    
    abstract set members(value: string[])
}


export abstract class Groups extends EventDispatcher<GroupEvent, Group>{

    abstract create(): Promise<Group>

    abstract get(id: GroupId): Promise<Group>

    abstract delete(id: GroupId): Promise<void>

}