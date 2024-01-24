import { EventDispatcher } from '../events'
import { Files } from './files'

export type WorkspaceId = string

/**
 * Workspace event.
 */
export enum WorkspaceEvent {
  CHANGED = 'changed'
}

/**
 * Workspaces event.
 */
export enum WorkspacesEvent {
  ADDED = 'added',
  REMOVED = 'removed'
}

/**
 * Workspace.
 */
export abstract class Workspace extends EventDispatcher<
  WorkspaceEvent,
  Workspace
> {
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
   * Create workspace.
   */
  abstract create(name: string, description: string): Promise<Workspace>

  /**
   * Delete workspace.
   */
  abstract delete(id: WorkspaceId): Promise<void>
}
