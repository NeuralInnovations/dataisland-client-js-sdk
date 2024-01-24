import { Context } from "../context"
import { Disposable } from "../disposable"
import { FileDto, FileListResponse } from "../dto/workspacesResponse"
import { OrganizationService } from "../services/organizationService"
import { RpcService } from "../services/rpcService"
import { FileImpl } from "./file.impl"
import { File, Files, FilesEvent, FilesList } from "./files"
import { WorkspaceImpl } from "./workspace.impl"


export class FilesListImpl extends FilesList implements Disposable{
  private _isDisposed: boolean = false

  public files: File[] = []
  public total: number = 0
  public filesPerPage: number = 0
  public page: number = 0

  get pages(): number {
    return this.total / this.filesPerPage
  }

  get isDisposed(): boolean {
    return this._isDisposed
  }

  dispose(): void {
    this._isDisposed = true
  }

}

export class FilesImpl extends Files{
  constructor(
        private readonly workspace: WorkspaceImpl, 
        private readonly context: Context
  ) {
    super()
  }

  public filesList?: FilesList

  async upload(file: any, name: string): Promise<File> {
    return await this.internalUpload(file, name)
  }
  async delete(id: string): Promise<void> {
    return await this.internalDeleteFile(id)
  }
  async query(query: string, page: number, limit: number): Promise<FilesList> {
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
    if (!response?.ok) {
      let text: string = ""
      try {
        text = (await response?.text()) ?? ""
      } catch (e) {
        console.error(e)
      }

      throw new Error(
        `File ${id} delete, response is not ok, status: ${response?.status},${response?.statusText} ${text}`
      )
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

  async internalQuery(query: string, page: number, limit: number): Promise<FilesList>{
    if (page === undefined || page === null) {
      throw new Error("File fetch, page is undefined or null")
    }
    if (limit === undefined || limit === null) {
      throw new Error("File fetch, limit is undefined or null")
    }
    if (limit === 0) {
      throw new Error("File fetch, limit is 0")
    }

    const data = {
      "workspaceId" : this.workspace.id,
      "organizationId" : this.context.resolve(OrganizationService)?.organizations.current!,
      "query" : query,
      "page" : page.toString(),
      "limit" : limit.toString()
    }
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Files/list")
      .searchParams(new Map(Object.entries(data)))
      .sendGet()

    if (!response?.ok) {
      let text: string = ""
      try {
        text = (await response?.text()) ?? ""
      } catch (e) {
        console.error(e)
      }

      throw new Error(
        `Files fetch, response is not ok, status: ${response?.status},${response?.statusText} ${text}`
      )
    }

    const files = (await response.json()) as FileListResponse

    const filesList = new FilesListImpl()
    filesList.total = files.totalFilesCount
    filesList.filesPerPage = files.filesPerPage
    filesList.page = page
    for (const fl of files.files){
      const file = new FileImpl(this.context).initFrom(fl)

      filesList.files.push(file)

      this.dispatch({
        type: FilesEvent.ADDED,
        data: file
      })
    }

    this.filesList = filesList

    return filesList
  }

  async internalUpload(file: any, name: string): Promise<File>{
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Files")
      .sendPost({
        OrganizationId: this.context.resolve(OrganizationService)?.organizations.current!,
        WorkspaceId: this.workspace.id,
        Name: name,
        Description: "",
        File: file

      })
    if (!response?.ok) {
      throw new Error(
        `File upload, response is not ok: ${response?.status}/${response?.statusText}`
      )
    }
    const result = (await response.json())["file"] as FileDto

    const fileImpl = new FileImpl(this.context).initFrom(result)

        this.filesList!.files.push(file)

        this.dispatch({
          type: FilesEvent.ADDED,
          data: file
        })

        return fileImpl
  }
    
}
