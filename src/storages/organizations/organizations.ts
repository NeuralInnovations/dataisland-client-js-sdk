import { EventDispatcher } from "../../events"
import { Organization } from "./organization"

/**
 * Organization id.
 */
export type OrganizationId = string

/**
 * Organization event.
 */
export enum OrganizationsEvent {
  ADDED = "added",
  REMOVED = "removed",
  CURRENT_CHANGED = "currentChanged"
}

/**
 * Organizations storage.
 */
export abstract class Organizations extends EventDispatcher<
  OrganizationsEvent,
  Organization
> {
  /**
   * User's organizations.
   */
  abstract get collection(): ReadonlyArray<Organization>

  /**
   * Current organization.
   */
  abstract get current(): OrganizationId
  abstract set current(value: OrganizationId)

  /**
   * Get organization by id.
   */
  abstract get(id: OrganizationId): Organization

  /**
   * Try to get organization by id.
   * @param id
   */
  abstract tryGet(id: OrganizationId): Organization | undefined

  /**
   * Create new organization.
   */
  abstract create(name: string, description: string): Promise<Organization>

  /**
   * Delete organization.
   */
  abstract delete(id: OrganizationId): Promise<void>

  /**
   * Apply invite code for user
   */
  abstract applyInviteCode(code: string): Promise<void>
}
