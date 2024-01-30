import { AccessGroupDto } from "../../dto/accessGroupResponse"
import { UserDto } from "../../dto/userInfoResponse"
import { WorkspaceDto } from "../../dto/workspacesResponse"
import { EventDispatcher } from "../../events"
import { OrganizationId } from "../organizations/organizations"

export type GroupId = string

export enum GroupEvent {
    ADDED = "added",
    REMOVED = "removed",
    UPDATED = "updated"
  }

export abstract class Group extends EventDispatcher<GroupEvent, Group> {

    abstract get id(): GroupId

    abstract get group(): AccessGroupDto

    abstract get members(): UserDto[]

    abstract getWorkspaces() : Promise<WorkspaceDto[]>

    abstract setWorkspaces(workspaces: string[]): Promise<void>

    abstract setName(name: string): Promise<void>

    abstract setPermits(permits: {isAdmin: boolean}): Promise<void>

    abstract setMembersIds(members: string[]): Promise<void>
}


export abstract class Groups extends EventDispatcher<GroupEvent, Group>{

    abstract create(name: string, organizationId: OrganizationId, permits: { isAdmin: boolean }, memberIds: string[]): Promise<Group>

    abstract get(id: GroupId): Promise<Group | undefined>

    abstract delete(id: GroupId): Promise<void>

}