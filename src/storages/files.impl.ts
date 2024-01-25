import { Context } from "../context"
import { Disposable } from "../disposable"
import { FileDto, FileListResponse } from "../dto/workspacesResponse"
import { OrganizationService } from "../services/organizationService"
import { RpcService } from "../services/rpcService"
import { FileImpl } from "./file.impl"
import { File, Files, FilesEvent, FilesList as FilesPage } from "./files"
import { WorkspaceImpl } from "./workspace.impl"


export class FilesPageImpl extends FilesPage implements Disposable{
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

export class FilesImpl extends Files{
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

  async internalQuery(query: string, page: number, limit: number): Promise<FilesPage>{
    if (page === undefined || page === null) {
      throw new Error("File fetch, page is undefined or null")
    }
    if (limit === undefined || limit === null) {
      throw new Error("File fetch, limit is undefined or null")
    }
    if (limit === 0) {
      throw new Error("File fetch, limit is 0")
    }

    const orgService = this.context.resolve(OrganizationService)

    if (orgService === undefined) {
      throw new Error("File fetch, organization service undefined")
    }

    const data = {
      "workspaceId" : this.workspace.id,
      "organizationId" : orgService.organizations.current,
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

    const filesList = new FilesPageImpl()
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

  async internalUpload(file: any): Promise<File>{
    const orgService = this.context.resolve(OrganizationService)

    if (orgService === undefined) {
      throw new Error("File load, organization service undefined")
    }

    let form = new FormData();
    form.append("organizationId", orgService.organizations.current)
    form.append("workspaceId", this.workspace.id)
    form.append("name", file.name)
    form.append("file", file, file.name);

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Files")
      .sendPost(form)
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
