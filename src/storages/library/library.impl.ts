import { Library } from "./library"
import {
  LibraryFolderDto,
  LibraryFolderResponse,
  LibraryPageResponse
} from "../../dto/libraryResponse"
import { LibraryPage } from "./libraryPage"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import { FileImpl } from "../files/file.impl"
import { Context } from "../../context"
import { LibraryPageImpl } from "./libraryPage.impl"
import { LibraryFolderImpl } from "./libraryFolder.impl"
import { LibraryFolder } from "./libraryFolder"
import { FolderId } from "./folderId"
import { LibraryId } from "./libraryId"

export class LibraryImpl extends Library {

  private _library?: LibraryFolderDto

  public root?: LibraryPage

  constructor(
    private readonly context: Context
  ) {
    super()
  }

  async initFrom(library: LibraryFolderDto) {
    this._library = library
  }

  get id(): LibraryId {
    if (this._library) {
      return this._library.id
    }
    throw new Error("Library is not loaded.")
  }

  get name(): string {
    if (this._library) {
      return this._library.name
    }
    throw new Error("Library is not loaded.")
  }

  async getFolder(folderId: FolderId): Promise<LibraryFolder> {
    if (folderId === undefined || folderId === null || folderId.trim() === "") {
      throw new Error("Query library folder, folderId is undefined or null")
    }

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/libraries/folder")
      .searchParam("libraryId", this.id)
      .searchParam("folderId", folderId)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Query library folder for ${folderId} failed`,
        response
      )
    }

    // parse files from the server's response
    const folder = (await response!.json()) as LibraryFolderResponse

    const libFolder = new LibraryFolderImpl(this, this.context)

    await libFolder.initFrom(folder.folder)

    return libFolder
  }

  async query(query: string, page: number, limit: number, folderId: FolderId | undefined): Promise<LibraryPage> {
    // check page
    if (page === undefined || page === null) {
      throw new Error("Query library root, page is undefined or null")
    }
    if (page < 0) {
      throw new Error("Query library root, page is negative")
    }

    // check limit
    if (limit === undefined || limit === null) {
      throw new Error("Query library root, limit is undefined or null")
    }
    if (limit === 0) {
      throw new Error("Query library root, limit is 0")
    }

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/libraries/content/list")
      .searchParam("libraryId", this.id)
      .searchParam("folderId", folderId ?? "")
      .searchParam("query", query)
      .searchParam("page", page.toString())
      .searchParam("limit", limit.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Query library root :${query}, page:${page}, limit:${limit}, failed`,
        response
      )
    }

    // parse files from the server's response
    const pageResponse = (await response!.json()) as LibraryPageResponse

    // create files list
    const root = new LibraryPageImpl()
    root.total = pageResponse.totalItemsCount
    root.filesPerPage = pageResponse.itemsPerPage
    root.page = page

    // init files from the server's response
    for (const fl of pageResponse.files) {

      // create file implementation
      const file = await new FileImpl(this.context).initFrom(fl)

      // add file to the collection
      root.files.push(file)
    }

    for (const flr of pageResponse.folders) {

      // create folder implementation
      const folder = new LibraryFolderImpl(this, this.context)

      await folder.initFrom(flr)

      // add folder to the collection
      root.folders.push(folder)
    }

    // set files list
    this.root = root

    return root
  }

}
