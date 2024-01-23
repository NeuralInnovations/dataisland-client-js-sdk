import { EventDispatcher } from '../events'

export type WorkspaceId = string

export enum WorkspacesEvent {
  ADDED = 'added',
  REMOVED = 'removed'
}

/**
 * Workspace.
 */
export abstract class Workspace {
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
  abstract create: (name: string, description: string) => Promise<Workspace>

  /**
   * Delete workspace.
   */
  abstract delete: (id: WorkspaceId) => Promise<void>
}
