import { Workspaces } from "../workspaces/workspaces"
import { OrganizationId } from "./organizations"
import { GroupId, Groups } from "../groups/groups"
import { Chats } from "../chats/chats"
import { EventDispatcher } from "../../events"


/**
 * Organization event.
 */
export enum OrganizationEvent {
  CHANGED = "changed"
}

/**
 * Organization.
 */
export abstract class Organization extends EventDispatcher<
OrganizationEvent,
Organization
>  {
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

  /**
   * Change organization name and description.
   */
  abstract change(name: string, description: string): Promise<void>

  /**
   * Create invite link
   */
  abstract createInviteLink(emails: string[], accessGroups: GroupId[]): Promise<void>
}
