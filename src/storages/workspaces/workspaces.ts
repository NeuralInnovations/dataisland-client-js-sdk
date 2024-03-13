import { EventDispatcher } from "../../events"
import { Workspace } from "./workspace"

export type WorkspaceId = string

/**
 * Workspaces event.
 */
export enum WorkspacesEvent {
  ADDED = "added",
  REMOVED = "removed"
}

/**
 * Organization's workspaces.
 */
export abstract class Workspaces extends EventDispatcher<
  WorkspacesEvent,
  Workspace
> {
  /**
   * Workspaces.
   */
  abstract get collection(): ReadonlyArray<Workspace>

  /**
   * Get workspace by id.
   * @param id
   */
  abstract get(id: WorkspaceId): Workspace

  /**
   * Try to get workspace by id.
   * @param id
   */
  abstract tryGet(id: WorkspaceId): Workspace | undefined

  /**
   * Check if workspace exists.
   * @param id
   */
  abstract contains(id: WorkspaceId): boolean

  /**
   * Create workspace.
   */
  abstract create(name: string, description: string, regulation?: {
    isCreateNewGroup: boolean,
    newGroupName: string,
    groupIds: string[]
  }): Promise<Workspace>

  /**
   * Delete workspace.
   */
  abstract delete(id: WorkspaceId): Promise<void>
}
