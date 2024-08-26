import { EventDispatcher } from "../../events"
import { Files } from "../files/files"
import { WorkspaceId } from "./workspaces"
import { Organization } from "../organizations/organization"

/**
 * Workspace event.
 */
export enum WorkspaceEvent {
  CHANGED = "changed"
}

/**
 * Workspace.
 */
export abstract class Workspace extends EventDispatcher<
  WorkspaceEvent,
  Workspace
> {
  /**
   * Organization.
   */
  abstract get organization(): Organization

  /**
   * Workspace id.
   */
  abstract get id(): WorkspaceId

  /**
   * Workspace name.
   */
  abstract get name(): string

  /**
   * Workspace description.
   */
  abstract get description(): string

  abstract get isShared(): boolean

  /**
   * Workspace files.
   */
  abstract get files(): Files

  /**
   * Workspace files count.
   */
  abstract filesCount(): Promise<number>

  /**
   * Change workspace name and description.
   */
  abstract change(name: string, description: string): Promise<void>

  /**
   * Make workspace available for the library implementation
   * @param isShared
   */
  abstract share(isShared: boolean): Promise<void>
}
