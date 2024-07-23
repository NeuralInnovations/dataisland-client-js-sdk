import { ApplyInviteCodeResponse } from "../../dto/userInfoResponse"
import { EventDispatcher } from "../../events"
import { Organization } from "./organization"
import {IconDto, ResourceType} from "../../dto/workspacesResponse"
import {UploadFile} from "../files/files"

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
  abstract applyInviteCode(code: string): Promise<ApplyInviteCodeResponse>

  /**
   * Upload icon for any available resource ( organization, user, workspace, chat )
   * @param organizationId
   * @param resourceId
   * @param resourceType
   * @param icon
   */
  abstract uploadIconGlobal(organizationId: string, resourceId: string, resourceType: ResourceType, icon: UploadFile): Promise<string>

  /**
   * Get icon url and name for given id
   * @param id
   */
  abstract getIconData(id: string): Promise<IconDto>

  /**
   * Get latest icon for provided resource
   * @param resourceId
   * @param resourceType
   */
  abstract getNewestIcon(resourceId: string, resourceType: ResourceType): Promise<IconDto>

  /**
   * Delete icon by ID
   * @param id
   */
  abstract deleteIcon(id: string): Promise<void>

}
