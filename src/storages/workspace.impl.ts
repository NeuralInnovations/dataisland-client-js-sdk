import { Context } from "../context"
import { Files } from "./files"
import { Workspace, WorkspaceEvent } from "./workspace"
import { OrganizationImpl } from "./organization.impl"
import { WorkspaceDto } from "../dto/workspacesResponse"
import { RpcService } from "../services/rpcService"

export class WorkspaceImpl extends Workspace {
  private _isMarkAsDeleted: boolean = false
  private _workspace?: WorkspaceDto

  constructor(
    public readonly organization: OrganizationImpl,
    public readonly context: Context
  ) {
    super()
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

  get files(): Files {
    throw new Error("Method not implemented.")
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
      description === null ||
      description.trim() === ""
    ) {
      throw new Error(
        "Description is required. Please provide a valid description."
      )
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Workspaces")
      .sendPut({
        workspaceId: this.id,
        profile: {
          name,
          description
        }
      })

    if (!response?.ok) {
      throw new Error(
        `Failed to change workspace. ${response?.status}, ${response?.statusText}`
      )
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
