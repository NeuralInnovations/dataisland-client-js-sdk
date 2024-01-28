import { Context } from "../context"
import { Disposable } from "../disposable"
import { FileDto, FileListResponse } from "../dto/workspacesResponse"
import { RpcService } from "../services/rpcService"
import { FileImpl } from "./file.impl"
import { Files, FilesEvent, UploadFile } from "./files"
import { WorkspaceImpl } from "./workspace.impl"
import { ResponseUtils } from "../services/responseUtils"
import { File } from "./file"
import { FilesPage } from "./filesPage"

export class FilesPageImpl extends FilesPage implements Disposable {
  private _isDisposed: boolean = false

  public files: File[] = []
  public total: number = 0
  public filesPerPage: number = 0
  public page: number = 0

  get pages(): number {
    return Math.ceil(Math.max(this.total / this.filesPerPage, 1.0))
  }

  get isDisposed(): boolean {
    return this._isDisposed
  }

  dispose(): void {
    this._isDisposed = true
  }
}

export class FilesImpl extends Files {
  constructor(
    private readonly workspace: WorkspaceImpl,
    private readonly context: Context
  ) {
    super()
  }

  // Object used as files page data, returned by "query"
  public filesList?: FilesPage

  async upload(file: any): Promise<File> {
    return await this.internalUpload(file)
  }

  async delete(id: string): Promise<void> {
    return await this.internalDeleteFile(id)
  }

  async query(query: string, page: number, limit: number): Promise<FilesPage> {
    return await this.internalQuery(query, page, limit)
  }

  //----------------------------------------------------------------------------
  // INTERNALS
  //----------------------------------------------------------------------------

  /**
   * Delete organization.
   * @param id
   */
  async internalDeleteFile(id: string): Promise<void> {
    if (id === undefined || id === null) {
      throw new Error("File delete, id is undefined or null")
    }
    if (id.length === 0 || id.trim().length === 0) {
      throw new Error("File delete, id is empty")
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("/api/v1/Files")
      .searchParam("id", id)
      .sendDelete()
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`File ${id} delete, failed`, response)
    }
    const file = <FileImpl>this.filesList!.files.find(f => f.id === id)
    const index = this.filesList!.files.indexOf(file)
    if (index < 0) {
      throw new Error("Organization delete, index is not found")
    }

    // remove file from collection
    this.filesList!.files.splice(index, 1)

    // dispatch event, file removed
    this.dispatch({
      type: FilesEvent.REMOVED,
      data: file
    })

    // dispose file
    file.dispose()
  }

  async internalQuery(
    query: string,
    page: number,
    limit: number
  ): Promise<FilesPage> {

    // check page
    if (page === undefined || page === null) {
      throw new Error("File fetch, page is undefined or null")
    }
    if (page < 0) {
      throw new Error("File fetch, page is negative")
    }

    // check limit
    if (limit === undefined || limit === null) {
      throw new Error("File fetch, limit is undefined or null")
    }
    if (limit === 0) {
      throw new Error("File fetch, limit is 0")
    }

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Files/list")

      .searchParam("workspaceId", this.workspace.id)
      .searchParam("organizationId", this.workspace.organization.id)
      .searchParam("query", query)
      .searchParam("page", page.toString())
      .searchParam("limit", limit.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Files fetch query:${query}, page:${page}, limit:${limit}, failed`,
        response
      )
    }

    // parse files from the server's response
    const files = (await response!.json()) as FileListResponse

    // create files list
    const filesList = new FilesPageImpl()
    filesList.total = files.totalFilesCount
    filesList.filesPerPage = files.filesPerPage
    filesList.page = page

    // init files from the server's response
    for (const fl of files.files) {

      // create file implementation
      const file = new FileImpl(this.context).initFrom(fl)

      // add file to the collection
      filesList.files.push(file)

      // dispatch event, file added
      this.dispatch({
        type: FilesEvent.ADDED,
        data: file
      })
    }

    // set files list
    this.filesList = filesList

    return filesList
  }

  async internalUpload(file: UploadFile): Promise<File> {
    // check file
    if (file === undefined || file === null) {
      throw new Error("File upload, file is undefined or null")
    }

    // form data to send
    const form = new FormData()
    form.append("organizationId", this.workspace.organization.id)
    form.append("workspaceId", this.workspace.id)
    form.append("name", file.name)
    form.append("file", file, file.name)

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Files")
      .sendPostFormData(form)

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`File upload ${file.name}`, response)
    }

    // parse file from the server's response
    const result = (await response!.json()).file as FileDto

    // create file implementation
    const fileImpl = new FileImpl(this.context).initFrom(result)

    // TODO: why is this here?
    this.filesList?.files.push(fileImpl)

    // dispatch event, file added
    this.dispatch({
      type: FilesEvent.ADDED,
      data: fileImpl
    })

    return fileImpl
  }
}
