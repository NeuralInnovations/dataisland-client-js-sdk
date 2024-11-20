import {OrganizationId} from "../organizations/organizations"
import {WorkspaceId} from "../workspaces/workspaces"
import {BrokenFilesResponse} from "../../dto/workspacesResponse"
import {EmailsWhitelistResponse} from "../../dto/invitesResponse"


export abstract class CheatsAdministration {

  /**
   * Cleans redis cache on server
   * @param cleanCache
   */
  abstract cleanRedisCache(cleanCache: boolean): Promise<void>

  /**
   * Get info about broken files on server
   * @param organizationId
   * @param workspaceId
   */
  abstract getBrokenFilesInfo(organizationId: OrganizationId, workspaceId: WorkspaceId): Promise<BrokenFilesResponse>

  /**
   * Delete broken files on server
   * @param organizationId
   * @param workspaceId
   * @param isRemoveFromDb
   * @param isRemoveFromService
   */
  abstract deleteBrokenFiles(organizationId: OrganizationId, workspaceId: WorkspaceId, isRemoveFromDb: boolean, isRemoveFromService: boolean): Promise<BrokenFilesResponse>

  /**
   * Adds email to server whitelist
   * @param email
   * @param expiredDays
   */
  abstract addEmailToWhitelist(email: string, expiredDays: number): Promise<void>

  /**
   * Deletes email from whitelist
   * @param email
   */
  abstract removeEmailFromWhitelist(email: string): Promise<void>

  /**
   * Get all emails from whitelise
   */
  abstract getWhitelistEmails(): Promise<EmailsWhitelistResponse>
}
