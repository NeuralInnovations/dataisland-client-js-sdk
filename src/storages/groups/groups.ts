import { AccessGroupDto } from "../../dto/accessGroupResponse"
import { UserDto } from "../../dto/userInfoResponse"
import { EventDispatcher } from "../../events"
import { UserId } from "../user/userProfile"
import { WorkspaceId } from "../workspaces/workspaces"
import { Workspace } from "../workspaces/workspace"

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
  abstract get workspaces(): readonly Workspace[]

  /**
   * Set workspaces.
   */
  abstract setWorkspaces(workspaces: WorkspaceId[]): Promise<void>

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
  abstract setMembersIds(members: UserId[]): Promise<void>

  /**
   * Remove members.
   * @param members
   */
  abstract removeMembers(members: UserId[]): Promise<void>

  /**
   * Remove workspaces.
   * @param workspaces
   */
  abstract removeWorkspaces(workspaces: WorkspaceId[]): Promise<void>
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
