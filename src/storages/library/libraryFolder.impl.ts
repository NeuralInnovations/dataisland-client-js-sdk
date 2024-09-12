import { LibraryFolder } from "./libraryFolder"
import { LibraryPage } from "./libraryPage"
import { Context } from "../../context"
import {
  LibraryFolderDto,
  LibraryPageResponse
} from "../../dto/libraryResponse"
import { LibraryImpl } from "./library.impl"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import { LibraryPageImpl, LibraryParentImpl } from "./libraryPage.impl"
import { FileImpl } from "../files/file.impl"
import { FolderId } from "./folderId"
import { LibraryId } from "./libraryId"

export class LibraryFolderImpl extends LibraryFolder {
  private _libFolder?: LibraryFolderDto

  constructor(
    private readonly libraryImpl: LibraryImpl,
    private readonly context: Context
  ) {
    super()
  }

  async initFrom(libFolder: LibraryFolderDto) {
    this._libFolder = libFolder
  }

  get iconId(): string {
    if (this._libFolder) {
      return this._libFolder.iconId
    }
    throw new Error("LibraryFolder is not loaded.")
  }

  itemsCount(): Promise<number> {
    return Promise.resolve(0)
  }

  get libraryId(): LibraryId {
    return this.libraryImpl.id
  }

  get name(): string {
    if (this._libFolder) {
      return this._libFolder.name
    }
    throw new Error("LibraryFolder is not loaded.")
  }

  get description(): string {
    if (this._libFolder) {
      return this._libFolder.description
    }
    throw new Error("LibraryFolder is not loaded.")
  }

  get folderId(): FolderId {
    if (this._libFolder) {
      return this._libFolder.id
    }
    throw new Error("LibraryFolder is not loaded.")
  }

  async query(query: string, page: number, limit: number): Promise<LibraryPage> {
    if (page === undefined || page === null) {
      throw new Error("Query library folder, page is undefined or null")
    }
    if (page < 0) {
      throw new Error("Query library folder, page is negative")
    }

    // check limit
    if (limit === undefined || limit === null) {
      throw new Error("Query library folder, limit is undefined or null")
    }
    if (limit === 0) {
      throw new Error("Query library folder, limit is 0")
    }

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/libraries/content/list")
      .searchParam("libraryId", this.libraryId)
      .searchParam("folderId", this.folderId)
      .searchParam("query", query)
      .searchParam("page", page.toString())
      .searchParam("limit", limit.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Query library folder :${query}, page:${page}, limit:${limit}, failed`,
        response
      )
    }

    // parse files from the server's response
    const libPageResponse = (await response!.json()) as LibraryPageResponse

    // create files list
    const libraryPage = new LibraryPageImpl()
    libraryPage.total = libPageResponse.totalItemsCount
    libraryPage.filesPerPage = libPageResponse.itemsPerPage
    libraryPage.page = page
    libraryPage.libraryId = this.libraryId

    const parentsWait = []
    for (const parentId of libPageResponse.parentIds) {
      parentsWait.push(this.libraryImpl.getFolder(parentId))
    }
    const parents = await Promise.all(parentsWait)
    for (const parent of parents) {
      libraryPage.parents.push(new LibraryParentImpl(parent.folderId, parent.name))
    }

    // init files from the server's response
    for (const fl of libPageResponse.files) {

      // create file implementation
      const file = await new FileImpl(this.context).initFrom(fl)

      // add file to the collection
      libraryPage.files.push(file)
    }

    for (const flr of libPageResponse.folders) {

      // create folder implementation
      const folder = new LibraryFolderImpl(this.libraryImpl, this.context)

      await folder.initFrom(flr)

      // add folder to the collection
      libraryPage.folders.push(folder)
    }

    return libraryPage
  }

}
