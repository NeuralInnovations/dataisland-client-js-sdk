import { EventDispatcher } from '../events'

/**
 * Organization id.
 */
export type OrganizationId = string

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
}

/**
 * Organization event.
 */
export enum OrganizationEvent {
  ADDED = 'added',
  REMOVED = 'removed',
  CHANGED = 'changed'
}

/**
 * Organizations storage.
 */
export abstract class Organizations extends EventDispatcher<
  OrganizationEvent,
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
   * Create new organization.
   */
  abstract create(name: string, description: string): Promise<Organization>

  /**
   * Delete organization.
   */
  abstract delete(id: OrganizationId): Promise<void>
}
