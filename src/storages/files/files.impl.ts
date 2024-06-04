import { Context } from "../../context"
import { FileDto, FileListResponse } from "../../dto/workspacesResponse"
import { RpcService } from "../../services/rpcService"
import { FileImpl } from "./file.impl"
import { Files, FilesEvent, UploadFile } from "./files"
import { WorkspaceImpl } from "../workspaces/workspace.impl"
import { ResponseUtils } from "../../services/responseUtils"
import { File } from "./file"
import { FilesPage } from "./filesPage"
import { FilesPageImpl } from "./filesPage.impl"
// import { FormData } from "../../utils/request"

export class FilesImpl extends Files {
  constructor(
    private readonly workspace: WorkspaceImpl,
    private readonly context: Context
  ) {
    super()
  }

  // Object used as files page data, returned by "query"
  public filesList?: FilesPage

  async upload(files: UploadFile[], metadata: Map<string, string>): Promise<File[]> {
    const loaded_files = []
    for (const file of files) {
      const loaded_file = await this.internalUpload(file, metadata)
      if (loaded_file != undefined){
        loaded_files.push(loaded_file)
      }
    }
    return loaded_files
  }

  async get(fileId: string): Promise<File>{
    return await this.internalGetFile(fileId)
  }

  async delete(ids: string[]): Promise<void> {
    for (const id of ids) {
      await this.internalDeleteFile(id)
    }
  }

  async query(query: string, page: number, limit: number): Promise<FilesPage> {
    return await this.internalQuery(query, page, limit)
  }

  //----------------------------------------------------------------------------
  // INTERNALS
  //----------------------------------------------------------------------------


  async internalGetFile(id: string): Promise<File>{
    if (id === undefined || id === null) {
      throw new Error("File get, id is undefined or null")
    }
    if (id.length === 0 || id.trim().length === 0) {
      throw new Error("File get, id is empty")
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Files")
      .searchParam("id", id)
      .sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed to get file ${id}`,
        response
      )
    }

    // parse file from the server's response
    const result = (await response!.json() as { file: FileDto }).file as FileDto

    // create file implementation
    const fileImpl = new FileImpl(this.context)

    return await fileImpl.initFrom(result)
  }

  /**
   * Delete file.
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
      throw new Error("File delete, index is not found")
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
      const file = await new FileImpl(this.context).initFrom(fl)

      // add file to the collection
      filesList.files.push(file)
    }

    // set files list
    this.filesList = filesList

    return filesList
  }

  async internalUpload(file: UploadFile, metadata: Map<string, string>): Promise<File | undefined> {
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
    form.append("metadata", JSON.stringify(Object.fromEntries(metadata)))

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Files")
      .sendPostFormData(form)

    // check response status
    if (ResponseUtils.isFail(response)) {
      if (await ResponseUtils.isLimitReached()){
        return undefined
      }
      
      await ResponseUtils.throwError(`File upload ${file.name}`, response)
    }

    // parse file from the server's response
    const result = (await response!.json() as { file: FileDto }).file as FileDto

    // create file implementation
    const fileImpl = new FileImpl(this.context)

    await fileImpl.initFrom(result)

    // dispatch event, file added
    this.dispatch({
      type: FilesEvent.ADDED,
      data: fileImpl
    })

    return fileImpl
  }
}
