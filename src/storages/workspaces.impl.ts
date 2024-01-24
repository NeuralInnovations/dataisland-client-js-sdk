import { Workspaces, WorkspacesEvent } from "./workspaces"
import { OrganizationImpl } from "./organization.impl"
import { Context } from "../context"
import { Workspace } from "./workspace"
import { WorkspaceImpl } from "./workspace.impl"
import { OrganizationId } from "./organizations"
import { RpcService } from "../services/rpcService"
import { OrganizationWorkspaces } from "../dto/userInfoResponse"

export class WorkspacesImpl extends Workspaces {
  private readonly _workspaces: WorkspaceImpl[] = []

  constructor(
    private readonly organization: OrganizationImpl,
    private readonly context: Context
  ) {
    super()
  }

  get collection(): readonly Workspace[] {
    return this._workspaces
  }

  get(id: string): Workspace {
    return <Workspace>this.tryGet(id)
  }

  tryGet(id: string): Workspace | undefined {
    return this._workspaces.find(workspace => workspace.id === id)
  }

  contains(id: string): boolean {
    return this._workspaces.find(workspace => workspace.id === id) !== undefined
  }

  create(name: string, description: string): Promise<Workspace> {
    throw new Error("Method not implemented.")
  }

  async delete(id: string): Promise<void> {
    // get workspace by id
    const workspace = <WorkspaceImpl>this.tryGet(id)

    // check if workspace is found
    if (!workspace) {
      throw new Error(`Workspace ${id} is not found`)
    }

    // check if workspace is already marked as deleted
    if (workspace.isMarkAsDeleted) {
      throw new Error(`Workspace ${id} is already marked as deleted`)
    }

    // mark workspace as deleted
    workspace.markToDelete()

    // send delete request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Organizations")
      .searchParam("id", id)
      .sendDelete()

    // check response status
    if (!response?.ok) {
      throw new Error(
        `Failed to delete workspace. Status: ${response?.status},${response?.statusText}`
      )
    }

    // remove workspace from the collection
    const index = this._workspaces.indexOf(<WorkspaceImpl>workspace)
    if (index < 0) {
      throw new Error(`Workspace ${id} is not found`)
    }
    this._workspaces.splice(index, 1)

    // dispatch event
    this.dispatch({
      type: WorkspacesEvent.REMOVED,
      data: workspace
    })
  }

  async initFrom(organizationId: OrganizationId): Promise<void> {
    // init workspaces from the server's response
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Organizations")
      .searchParam("id", organizationId)
      .sendGet()

    // check response status
    if (!response?.ok) {
      throw new Error(
        `Failed to fetch workspaces. Status: ${response?.status},${response?.statusText}`
      )
    }

    // parse workspaces from the server's response
    const workspaces = ((await response.json()) as OrganizationWorkspaces)
      .workspaces

    // init workspaces from the server's response
    for (const workspace of workspaces) {
      // create workspace implementation
      const workspaceImpl = new WorkspaceImpl(this.organization, this.context)

      // init workspace from the server's response
      await workspaceImpl.initFrom(workspace)

      // add workspace to the collection
      this._workspaces.push(workspaceImpl)
    }
  }
}
