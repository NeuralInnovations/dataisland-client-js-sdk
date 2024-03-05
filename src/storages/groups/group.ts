import { EventDispatcher } from "../../events"
import { AccessGroupDto } from "../../dto/accessGroupResponse"
import { UserDto } from "../../dto/userInfoResponse"
import { Workspace } from "../workspaces/workspace"
import { WorkspaceId } from "../workspaces/workspaces"
import { UserId } from "../user/userProfile"

/**
 * Group id.
 */
export type GroupId = string

export enum GroupEvent {
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
