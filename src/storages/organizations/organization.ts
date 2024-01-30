import { Workspaces } from "../workspaces/workspaces"
import { OrganizationId } from "./organizations"
import { Groups } from "../groups/groups"
import { Chats } from "../chats/chats"

/**
 * Organization.
 */
export abstract class Organization {
  /**
   * Organization id.
   */
  abstract get id(): OrganizationId

  /**
   * Organization name.
   */
  abstract get name(): string

  /**
   * Organization description.
   */
  abstract get description(): string

  /**
   * Workspaces.
   */
  abstract get workspaces(): Workspaces

  /**
   * Chats.
   */
  abstract get chats(): Chats
  
  /**
   * Groups.
   */
  abstract get accessGroups(): Groups

}
