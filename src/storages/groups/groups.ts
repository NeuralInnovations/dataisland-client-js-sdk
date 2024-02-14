import { AccessGroupDto } from "../../dto/accessGroupResponse"
import { UserDto } from "../../dto/userInfoResponse"
import { WorkspaceDto } from "../../dto/workspacesResponse"
import { EventDispatcher } from "../../events"

/**
 * Group id.
 */
export type GroupId = string

/**
 * Group event.
 */
export enum GroupEvent {
  ADDED = "added",
  REMOVED = "removed",
  UPDATED = "updated"
}

/**
 * Group.
 */
export abstract class Group extends EventDispatcher<GroupEvent, Group> {

  /**
   * Group id.
   */
  abstract get id(): GroupId

  /**
   * Group information.
   */
  abstract get group(): AccessGroupDto

  /**
   * Group members.
   */
  abstract get members(): UserDto[]

  /**
   * Group workspaces.
   */
  abstract getWorkspaces(): Promise<WorkspaceDto[]>

  /**
   * Set workspaces.
   */
  abstract setWorkspaces(workspaces: string[]): Promise<void>

  /**
   * Set name.
   */
  abstract setName(name: string): Promise<void>

  /**
   * Set permits.
   */
  abstract setPermits(permits: { isAdmin: boolean }): Promise<void>

  /**
   * Set members.
   */
  abstract setMembersIds(members: string[]): Promise<void>
}

/**
 * Groups storage.
 */
export abstract class Groups extends EventDispatcher<GroupEvent, Group> {

  /**
   * Collection.
   */
  abstract get collection(): ReadonlyArray<Group>

  /**
   * Create new group.
   * @param name
   * @param permits
   * @param memberIds
   */
  abstract create(name: string, permits: {
    isAdmin: boolean
  }, memberIds: string[]): Promise<Group>

  /**
   * Get group by id.
   * @param id
   */
  abstract get(id: GroupId): Group | undefined

  /**
   * delete group by id.
   * @param id
   */
  abstract delete(id: GroupId): Promise<void>

}
