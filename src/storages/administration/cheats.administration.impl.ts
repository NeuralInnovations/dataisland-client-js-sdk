import {CheatsAdministration} from "./cheats.administration"
import {Context} from "../../context"
import {OrganizationId} from "../organizations/organizations"
import {WorkspaceId} from "../workspaces/workspaces"
import {BrokenFilesResponse} from "../../dto/workspacesResponse"
import {EmailsWhitelistResponse} from "../../dto/invitesResponse"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"


export class CheatsAdministrationImpl extends CheatsAdministration {
  private context: Context

  constructor(context: Context) {
    super()
    this.context = context
  }

  async cleanRedisCache(cleanCache: boolean): Promise<void> {
    if (cleanCache === undefined ||cleanCache === null) {
      throw new Error("cleanCache is required, must be not empty")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Cheats/clean/cache")
      .sendPostJson({
        cleanCache: cleanCache
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to clean redis cache", response)
    }
  }

  async deleteBrokenFiles(organizationId: OrganizationId, workspaceId: WorkspaceId, isRemoveFromDb: boolean, isRemoveFromService: boolean): Promise<BrokenFilesResponse> {
    if (organizationId === undefined || organizationId === null || organizationId.trim() === "") {
      throw new Error("organizationId is required, must be not empty")
    }

    if (workspaceId === undefined || workspaceId === null || workspaceId.trim() === "") {
      throw new Error("workspaceId is required, must be not empty")
    }

    if (isRemoveFromDb === undefined || isRemoveFromDb === null) {
      throw new Error("isRemoveFromDb is required, must be not empty")
    }

    if (isRemoveFromService === undefined || isRemoveFromService === null) {
      throw new Error("isRemoveFromService is required, must be not empty")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Cheats/files/broken/clean")
      .sendPostJson({
        organizationId: organizationId,
        workspaceId: workspaceId,
        isRemoveFromDb: isRemoveFromDb,
        isRemoveFromService: isRemoveFromService
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to clean broken files for ${organizationId}, workspace ${workspaceId}`, response)
    }

    return (await response!.json()) as BrokenFilesResponse
  }

  async getBrokenFilesInfo(organizationId: OrganizationId, workspaceId: WorkspaceId): Promise<BrokenFilesResponse> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Cheats/files/broken/info")
      .searchParam("organizationId", organizationId)
      .searchParam("workspaceId", workspaceId)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        "Can not get broken files info",
        response
      )
    }

    return (await response!.json()) as BrokenFilesResponse
  }

  async getWhitelistEmails(): Promise<EmailsWhitelistResponse> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Cheats/invites/white_list")
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        "Can not get emails whitelist",
        response
      )
    }

    return (await response!.json()) as EmailsWhitelistResponse
  }

  async addEmailToWhitelist(email: string, expiredDays: number): Promise<void> {
    if (email === undefined || email === null || email.trim() === "") {
      throw new Error("email is required, must be not empty")
    }

    if (expiredDays === undefined || expiredDays === null || expiredDays === 0) {
      throw new Error("expiredDays is required, must be not empty and grater than 0")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Cheats/invites/white_list")
      .sendPostJson({
        email: email,
        expiredDays: expiredDays
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to add email ${email} to whitelist`, response)
    }
  }

  async removeEmailFromWhitelist(email: string): Promise<void> {
    if (email === null || email === undefined || email.length === 0 || email.trim().length === 0) {
      throw new Error("Email delete from whitelist, email is empty")
    }

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("/api/v1/Cheats/invites/white_list")
      .searchParam("email", email)
      .sendDelete()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Email ${email} delete from whitelist failed`,
        response
      )
    }
  }

}
