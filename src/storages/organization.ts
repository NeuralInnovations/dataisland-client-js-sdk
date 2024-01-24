import { Workspaces } from "./workspaces"
import { OrganizationId } from "./organizations"

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
}
