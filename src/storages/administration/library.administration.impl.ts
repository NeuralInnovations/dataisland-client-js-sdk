import { LibraryAdministration } from "./library.administration"
import { Context } from "../../context"
import { LibraryId } from "../library/libraryId"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import {
  CreateLibraryResponse,
  LibraryDto,
  LibraryResponse
} from "../../dto/libraryResponse"
import { OrganizationId } from "../organizations/organizations"

export class LibraryAdministrationImpl extends LibraryAdministration {
  private context: Context

  constructor(context: Context) {
    super()
    this.context = context
  }

  async createLibrary(name: string, description: string, region: number, isPublic: boolean): Promise<LibraryId> {
    if (
      name === undefined ||
      name === null ||
      name.trim() === ""
    ) {
      throw new Error("Name for library is required, must be not empty")
    }

    if (
      description === undefined ||
      description === null ||
      description.trim() === ""
    ) {
      throw new Error("Description for library is required, must be not empty")
    }

    if (
      isPublic === undefined ||
      isPublic === null
    ) {
      throw new Error("IsPublic is required, must be not empty")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/libraries")
      .sendPostJson({
        name: name,
        description: description,
        region: region,
        isPublic: isPublic
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to create library ${name}`, response)
    }

    const library = (await response!.json()) as CreateLibraryResponse

    return library.libraryId
  }

  async addOrgToLibrary(libraryId: LibraryId, organizationId: OrganizationId): Promise<void> {
    if (libraryId === undefined || libraryId === null) {
      throw new Error("Organization add to library, libraryId is undefined or null")
    }
    if (libraryId.length === 0 || libraryId.trim().length === 0) {
      throw new Error("Organization add to from library, libraryId is empty")
    }
    if (organizationId === undefined || organizationId === null) {
      throw new Error("Organization add to from library, organizationId is undefined or null")
    }
    if (organizationId.length === 0 || organizationId.trim().length === 0) {
      throw new Error("Organization add to from library, organizationId is empty")
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/libraries/allowed/organization")
      .sendPutJson({
        libraryId: libraryId,
        organizationId: organizationId
      })
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Organization ${organizationId} add to library ${libraryId} failed`,
        response
      )
    }
  }

  async getLibraries(): Promise<LibraryDto[]> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/libraries/allowed/organizations")
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        "Can not get libraries",
        response
      )
    }

    // parse libraries from the server's response
    const libraries = (await response!.json()) as LibraryResponse

    return libraries.libraries
  }

  async deleteOrgFromLibrary(libraryId: LibraryId, organizationId: OrganizationId): Promise<void> {
    if (libraryId === undefined || libraryId === null) {
      throw new Error("Organization delete from library, libraryId is undefined or null")
    }
    if (libraryId.length === 0 || libraryId.trim().length === 0) {
      throw new Error("Organization delete from library, libraryId is empty")
    }
    if (organizationId === undefined || organizationId === null) {
      throw new Error("Organization delete from library, organizationId is undefined or null")
    }
    if (organizationId.length === 0 || organizationId.trim().length === 0) {
      throw new Error("Organization delete from library, organizationId is empty")
    }

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/libraries/allowed/organization")
      .searchParam("libraryId", libraryId)
      .searchParam("organizationId", organizationId)
      .sendDelete()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Organization ${organizationId} delete from library ${libraryId}, failed`,
        response
      )
    }
  }

  async deleteLibrary(libraryId: LibraryId): Promise<void> {
    if (libraryId === undefined || libraryId === null) {
      throw new Error("Library delete, libraryId is undefined or null")
    }
    if (libraryId.length === 0 || libraryId.trim().length === 0) {
      throw new Error("Library delete, libraryId is empty")
    }

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/libraries")
      .searchParam("libraryId", libraryId)
      .sendDelete()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Library ${libraryId} delete, failed`,
        response
      )
    }
  }
}
