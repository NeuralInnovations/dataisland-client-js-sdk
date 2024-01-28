import { EventDispatcher } from "../events"
import { Files } from "./files"
import { WorkspaceId } from "./workspaces"
import { Organization } from "./organization"

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

  /**
   * Workspace files.
   */
  abstract get files(): Files

  /**
   * Change workspace name and description.
   */
  abstract change(name: string, description: string): Promise<void>
}
