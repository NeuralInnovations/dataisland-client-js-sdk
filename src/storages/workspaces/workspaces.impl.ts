import { WorkspaceId, Workspaces, WorkspacesEvent } from "./workspaces"
import { OrganizationImpl } from "../organizations/organization.impl"
import { Context } from "../../context"
import { Workspace } from "./workspace"
import { WorkspaceImpl } from "./workspace.impl"
import { OrganizationId } from "../organizations/organizations"
import { RpcService } from "../../services/rpcService"
import { OrganizationWorkspaces } from "../../dto/userInfoResponse"
import { WorkspaceDto } from "../../dto/workspacesResponse"
import { ResponseUtils } from "../../services/responseUtils"
import { UserProfileService } from "../../services/userProfileService"
import { UserProfile } from "../user/userProfile"

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

  /**
   * Create workspace.
   * @param name
   * @param description
   * @param regulation
   */
  async create(
    name: string,
    description: string,
    regulation?: {
      isCreateNewGroup: boolean
      newGroupName?: string
      groupIds?: string[]
    }
  ): Promise<Workspace | undefined> {
    if (name === undefined || name === null || name.trim() === "") {
      throw new Error("Name is required, must be not empty")
    }
    if (
      description === undefined ||
      description === null ||
      description.trim() === ""
    ) {
      throw new Error("Description is required, must be not empty")
    }
    if (regulation) {
      if (
        regulation.isCreateNewGroup === undefined ||
        regulation.isCreateNewGroup === null
      ) {
        throw new Error("isCreateNewGroup is required, must be not empty")
      }
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Workspaces")
      .sendPostJson({
        organizationId: this.organization.id,
        profile: {
          name: name,
          description: description
        },
        regulation: {
          isCreateNewGroup: regulation?.isCreateNewGroup,
          newGroupName: regulation?.newGroupName,
          groupIds: regulation?.groupIds
        }
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      if (await ResponseUtils.isLimitReached()){
        return undefined
      }
      
      await ResponseUtils.throwError(`Failed to create workspace, in organization: ${this.organization.id}`, response)
    }

    // parse workspace from the server's response
    const content = ((await response!.json()) as {
      workspace: WorkspaceDto
    }).workspace as WorkspaceDto

    // create workspace implementation
    const workspace = new WorkspaceImpl(this.organization, this.context)
    await workspace.initFrom(content)

    // add workspace to the collection
    this._workspaces.push(workspace)

    await this.organization.accessGroups.reload()

    // dispatch event
    this.dispatch({
      type: WorkspacesEvent.ADDED,
      data: workspace
    })

    return workspace
  }

  /**
   * Delete workspace.
   * @param id
   */
  async delete(id: WorkspaceId): Promise<void> {
    // get workspace by id
    const workspace = <WorkspaceImpl>this.tryGet(id)

    // check if workspace is found
    if (!workspace) {
      throw new Error(`Workspace ${id} is not found`)
    }

    // check if workspace is already marked as deleted
    if (workspace.isMarkAsDeleted) {
      throw new Error(`Workspace ${id} is already marked as deleted, in organization: ${this.organization.id}`)
    }

    // mark workspace as deleted
    workspace.markToDelete()

    // send delete request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Workspaces")
      .searchParam("id", id)
      .sendDelete()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed to delete workspace: ${workspace.organization.name}/${workspace.name}:${id}, in organization: ${this.organization.id}`,
        response
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
    if (ResponseUtils.isFail(response)) {
      const userProfile = this.context.resolve(UserProfileService)?.userProfile as UserProfile
      await ResponseUtils.throwError(`Failed to fetch workspaces in organization: ${organizationId}, userId: ${userProfile.id}, email: ${userProfile.email}`, response)
    }

    // parse workspaces from the server's response
    const workspaces = ((await response!.json()) as OrganizationWorkspaces)
      .workspaces

    // init workspaces from the server's response
    for (const workspace of workspaces) {
      // create workspace implementation
      const workspaceImpl = new WorkspaceImpl(this.organization, this.context)

      // init workspace from the server's response
      await workspaceImpl.initFrom(workspace)

      // add workspace to the collection
      this._workspaces.push(workspaceImpl)

      // dispatch event
      this.dispatch({
        type: WorkspacesEvent.ADDED,
        data: workspaceImpl
      })
    }
  }
}
