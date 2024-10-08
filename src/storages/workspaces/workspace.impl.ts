import { Context } from "../../context"
import { Files } from "../files/files"
import { Workspace, WorkspaceEvent } from "./workspace"
import { OrganizationImpl } from "../organizations/organization.impl"
import { WorkspaceDto } from "../../dto/workspacesResponse"
import { RpcService } from "../../services/rpcService"
import { FilesImpl } from "../files/files.impl"
import { ResponseUtils } from "../../services/responseUtils"

export class WorkspaceImpl extends Workspace {
  private _isMarkAsDeleted: boolean = false
  private _workspace?: WorkspaceDto

  private readonly _files: FilesImpl

  constructor(
    public readonly organization: OrganizationImpl,
    public readonly context: Context
  ) {
    super()
    this._files = new FilesImpl(this, context)
  }

  get id(): string {
    if (this._workspace) {
      return this._workspace.id
    }
    throw new Error("Workspace is not loaded.")
  }

  get name(): string {
    if (this._workspace) {
      return this._workspace.profile.name
    }
    throw new Error("Workspace is not loaded.")
  }

  get description(): string {
    if (this._workspace) {
      return this._workspace.profile.description
    }
    throw new Error("Workspace is not loaded.")
  }

  get isShared(): boolean {
    if (this._workspace) {
      return this._workspace.profile.isShared
    }
    throw new Error("Workspace is not loaded.")
  }

  get files(): Files {
    return this._files
  }

  async filesCount(): Promise<number> {
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Workspaces/files/count")
      .searchParam("workspaceId", this.id)
      .searchParam("organizationId", this.organization.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed during get workspace total files count for ${this.id} of ${this.organization.id}`,
        response
      )
    }

    return ((await response!.json()) as { count: number }).count
  }

  async change(name: string, description: string): Promise<void> {
    if (!this._workspace) {
      throw new Error("Workspace is not loaded.")
    }
    if (this._isMarkAsDeleted) {
      throw new Error("Workspace is marked as deleted.")
    }
    if (name === this.name && description === this.description) {
      return Promise.resolve()
    }
    if (name === undefined || name === null || name.trim() === "") {
      throw new Error("Name is required. Please provide a valid name.")
    }
    if (
      description === undefined ||
      description === null
    ) {
      description = ""
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Workspaces")
      .sendPutJson({
        workspaceId: this.id,
        profile: {
          name,
          description
        }
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to change workspace", response)
    }

    if (this._workspace) {
      this._workspace.profile.name = name
      this._workspace.profile.description = description
    }

    this.dispatch({
      type: WorkspaceEvent.CHANGED,
      data: this
    })
  }

  async share(isShared: boolean): Promise<void> {
    if (!this._workspace) {
      throw new Error("Workspace is not loaded.")
    }
    if (this._isMarkAsDeleted) {
      throw new Error("Workspace is marked as deleted.")
    }
    if (isShared === this.isShared) {
      return Promise.resolve()
    }
    if (isShared === undefined || isShared === null) {
      throw new Error("Is shared parameter is required.")
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/workspaces/library")
      .sendPutJson({
        workspaceId: this.id,
        isShared: isShared
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to change workspace shared state", response)
    }

    if (this._workspace) {
      this._workspace.profile.isShared = isShared
    }

    this.dispatch({
      type: WorkspaceEvent.CHANGED,
      data: this
    })
  }

  async initFrom(workspace: WorkspaceDto) {
    this._workspace = workspace
  }

  get isMarkAsDeleted(): boolean {
    return this._isMarkAsDeleted
  }

  markToDelete(): void {
    this._isMarkAsDeleted = true
  }
}
