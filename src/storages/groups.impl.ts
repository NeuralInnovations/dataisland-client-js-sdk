import { Context } from "../context"
import { Disposable } from "../disposable"
import { AccessGroupDto, AccessGroupResponse, AccessGroupsResponse } from "../dto/accessGroupResponse"
import { UserDto } from "../dto/userInfoResponse"
import { WorkspaceDto, WorkspacesResponse } from "../dto/workspacesResponse"
import { RpcService } from "../services/rpcService"
import { Group, GroupEvent, GroupId, Groups } from "./groups"
import { OrganizationImpl } from "./organization.impl"
import { OrganizationId } from "./organizations"

export class GroupImpl extends Group implements Disposable {
  private _isDisposed: boolean = false
  private _content?: AccessGroupDto
  private _members?: UserDto[]

  constructor(
    private readonly context: Context
  ) {
    super()
  }

  async initFrom(id: GroupId): Promise<Group>{
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/AccessGroups")
      .searchParam("id", id)
      .sendGet()

    if (!response?.ok) {
      let text: string = ""
      try {
        text = (await response?.text()) ?? ""
      } catch (e) {
        console.error(e)
      }

      throw new Error(
        `Get group, response is not ok, status: ${response?.status},${response?.statusText} ${text}`
      )
    }

    const group = (await response.json()) as AccessGroupResponse

    this._content = group.group
    this._members = group.members

    return this
  }

  get id(): GroupId {
    if (this._content) {
      return this._content.id
    }
    throw new Error("Access group is not loaded.")
  }

  get group(): AccessGroupDto {
    if (this._content) {
      return this._content
    }
    throw new Error("Access group is not loaded.")
  }

  async getWorkspaces(): Promise<WorkspaceDto[]> {
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Organizations/workspaces")
      .searchParam("groupId", this.id)
      .sendGet()

    if (!response?.ok) {
      let text: string = ""
      try {
        text = (await response?.text()) ?? ""
      } catch (e) {
        console.error(e)
      }
  
      throw new Error(
        `Groups get workspaces, response is not ok, status: ${response?.status},${response?.statusText} ${text}`
      )
    }
  
    const workspaces = (await response.json()) as WorkspacesResponse

    return workspaces.workspaces
  }

  get members(): UserDto[] {
    if (this._members){
      return this._members
    }
    throw new Error("Access group is not loaded.")
  }

  async setName(name: string): Promise<void> {
    if (name === undefined || name === null) {
      throw new Error("Groups change, name is undefined or null")
    }
    if (name.length === 0 || name.trim().length === 0) {
      throw new Error("Groups change, name is empty")
    }
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/AccessGroups/name")
      .sendPut({
        groupId: this.id,
        name: name
      })

    if (!response?.ok) {
      throw new Error(
        `Failed to set new name. ${response?.status}, ${response?.statusText}`
      )
    }
  }

  async setPermits(permits: {isAdmin: boolean}) : Promise<void> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/AccessGroups/permits")
      .sendPut({
        groupId: this.id,
        permits: permits
      })

    if (!response?.ok) {
      throw new Error(
        `Failed to set new permits. ${response?.status}, ${response?.statusText}`
      )
    }
  }


  async setWorkspaces(workspaces: string[]): Promise<void> {
    if (workspaces === null || workspaces === undefined){
      throw new Error("Group add workspaces, workspaces is undefined or null")
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/AccessGroups/workspaces")
      .sendPut({
        groupId: this.id,
        actualWorkspaceIds: workspaces
      })

    if (!response?.ok) {
      throw new Error(
        `Failed to set new member Ids. ${response?.status}, ${response?.statusText}`
      )
    }
  }


  async setMembersIds(members: string[]) {
    if (members === null || members === undefined){
      throw new Error("Group add members, members is undefined or null")
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/AccessGroups/members")
      .sendPut({
        groupId: this.id,
        memberIds: members
      })

    if (!response?.ok) {
      throw new Error(
        `Failed to set new member Ids. ${response?.status}, ${response?.statusText}`
      )
    }

  }

  get isDisposed(): boolean {
    return this._isDisposed
  }

  dispose(): void {
    this._isDisposed = true
  }
}

export class GroupsImpl extends Groups {

  private _groups: Group[] = []

  constructor(
    private readonly organization: OrganizationImpl,
    private readonly context: Context
  ) {
    super()
  }

  async initialize(){
    await this.internalInit()
  }

  async create(name: string, organizationId: OrganizationId, permits: { isAdmin: boolean }, memberIds: string[]): Promise<Group> {
    return await this.internalCreate(name, organizationId, permits, memberIds)
  }
  async get(id: GroupId): Promise<Group | undefined> {
    return await this._groups.find(group => group.id === id)
  }
  async delete(id: GroupId): Promise<void> {
    return await this.internalDeleteGroup(id)
  }


  //----------------------------------------------------------------------------
  // INTERNALS
  //----------------------------------------------------------------------------

  /**
   * Init access groups.
   */
  async internalInit(): Promise<void> {
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Organizations/access_groups")
      .searchParam("id", this.organization.id)
      .sendGet()

    if (!response?.ok) {
      let text: string = ""
      try {
        text = (await response?.text()) ?? ""
      } catch (e) {
        console.error(e)
      }
  
      throw new Error(
        `Groups init, response is not ok, status: ${response?.status},${response?.statusText} ${text}`
      )
    }
  
    const groups = (await response.json()) as AccessGroupsResponse

    for (const gr of groups.groups){
      const group = await new GroupImpl(this.context).initFrom(gr.id)

      this._groups.push(group)

      this.dispatch({
        type: GroupEvent.ADDED,
        data: group
      })
    }
  }

  async internalCreate(name: string, organizationId: OrganizationId, permits: { isAdmin: boolean }, memberIds: string[]): Promise<Group>{
    if (name === undefined || name === null) {
      throw new Error("Group create, name is undefined or null")
    }
    if (name.length === 0 || name.trim().length === 0) {
      throw new Error("Group create, name is empty")
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/AccessGroups")
      .sendPost({
        name: name,
        organizationId: organizationId,
        permits: permits,
        memberIds: memberIds
      })

    if (!response?.ok) {
      throw new Error(
        `Organization create, response is not ok: ${response?.status}/${response?.statusText}`
      )
    }
    const content = (await response.json()) as AccessGroupResponse

    const group = await new GroupImpl(this.context).initFrom(content.group.id)

    this._groups.push(group)

    this.dispatch({
      type: GroupEvent.ADDED,
      data: group
    })

    return group
  }

  /**
   * Delete group.
   * @param id
   */
  async internalDeleteGroup(id: GroupId): Promise<void> {
    if (id === undefined || id === null) {
      throw new Error("Group delete, id is undefined or null")
    }
    if (id.length === 0 || id.trim().length === 0) {
      throw new Error("Group delete, id is empty")
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("/api/v1/AccessGroups")
      .searchParam("groupId", id)
      .sendDelete()
    if (!response?.ok) {
      let text: string = ""
      try {
        text = (await response?.text()) ?? ""
      } catch (e) {
        console.error(e)
      }

      throw new Error(
        `Group ${id} delete, response is not ok, status: ${response?.status},${response?.statusText} ${text}`
      )
    }

    const group = <GroupImpl>this._groups.find(f => f.id === id)
    const index = this._groups.indexOf(group)
    if (index < 0) {
      throw new Error("Group delete, index is not found")
    }

    // remove group from collection
    this._groups.splice(index, 1)

    // dispatch event, group removed
    this.dispatch({
      type: GroupEvent.REMOVED,
      data: group
    })

    // dispose group
    group.dispose()
  }

    
}
