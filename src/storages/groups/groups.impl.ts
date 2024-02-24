import { Context } from "../../context"
import { Disposable } from "../../disposable"
import {
  AccessGroupDto,
  AccessGroupResponse,
  AccessGroupsResponse
} from "../../dto/accessGroupResponse"
import { UserDto } from "../../dto/userInfoResponse"
import { WorkspaceDto, WorkspacesResponse } from "../../dto/workspacesResponse"
import { RpcService } from "../../services/rpcService"
import { Group, GroupEvent, GroupId, Groups } from "./groups"
import { OrganizationImpl } from "../organizations/organization.impl"
import { ResponseUtils } from "../../services/responseUtils"
import { Organization } from "../organizations/organization"
import { UserId } from "../user/userProfile"

export class GroupImpl extends Group implements Disposable {
  private _isDisposed: boolean = false
  private _content?: AccessGroupDto
  private _members?: UserDto[]

  constructor(
    private readonly context: Context,
    public readonly organization: Organization
  ) {
    super()
  }

  async initFrom(id: GroupId): Promise<Group> {
    await this.reloadGroup(id)
    return this
  }

  async reloadGroup(id: GroupId): Promise<void> {
    // fetch group
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/AccessGroups")
      .searchParam("groupId", id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get group: ${id}, organization: ${this.organization.id}`, response)
    }

    // parse group from the server's response
    const group = (await response!.json()) as AccessGroupResponse
    // init group
    this._content = group.group
    this._members = group.members
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
    // fetch workspaces
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Organizations/workspaces")
      .searchParam("id", this.id)
      .sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get workspaces for group: ${this.id}, organization: ${this.organization.id}`, response)
    }

    // parse workspaces from the server's response
    const workspaces = (await response!.json()) as WorkspacesResponse

    return workspaces.workspaces
  }

  get members(): UserDto[] {
    if (this._members) {
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
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/AccessGroups/name")
      .sendPutJson({
        groupId: this.id,
        name: name
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to change group name, group: ${this.id}, organization: ${this.organization.id}`, response)
    }

    if (this._content) {
      this._content.name = name
    }
  }

  async setPermits(permits: { isAdmin: boolean }): Promise<void> {
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/AccessGroups/permits")
      .sendPutJson({
        groupId: this.id,
        permits: permits
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to change group permits, group: ${this.id}, organization: ${this.organization.id}`, response)
    }
  }

  async setWorkspaces(workspaces: string[]): Promise<void> {
    if (workspaces === null || workspaces === undefined) {
      throw new Error("Group add workspaces, workspaces is undefined or null")
    }

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/AccessGroups/workspaces")
      .sendPutJson({
        groupId: this.id,
        actualWorkspaceIds: workspaces
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to set workspaces for group: ${this.id}, organization: ${this.organization.id}`, response)
    }
  }

  async setMembersIds(members: UserId[]) {
    if (members === null || members === undefined) {
      throw new Error("Group setMembersIds, members is undefined or null")
    }

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/AccessGroups/members")
      .sendPutJson({
        groupId: this.id,
        memberIds: members
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to set members for group: ${this.id}, organization: ${this.organization.id}`, response)
    }

    // reload group
    await this.reloadGroup(this.id)
  }

  async removeMembers(members: UserId[]): Promise<void> {
    // check members
    if (members === null || members === undefined) {
      throw new Error("Group removeMembers, members is undefined or null")
    }

    // make set of members
    const groupMembers = new Set(this.members.map(m => m.id))

    // check argument
    if (!members.every(m => groupMembers.has(m))) {
      const notExistingMembers = members.filter(memberId => !groupMembers.has(memberId))
      throw new Error(`Group removeMembers, members contains not existing members: ${notExistingMembers}`)
    }

    // remove members
    for (const id of members) {
      groupMembers.delete(id)
    }

    // send request to the server
    await this.setMembersIds(Array.from(groupMembers))
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
    public readonly organization: OrganizationImpl,
    private readonly context: Context
  ) {
    super()
  }

  get collection(): readonly Group[] {
    return this._groups
  }

  async initialize() {
    await this.internalInit()
  }

  async create(name: string, permits: {
    isAdmin: boolean
  }, memberIds: string[]): Promise<Group> {
    return await this.internalCreate(name, permits, memberIds)
  }

  get(id: GroupId): Group | undefined {
    return this._groups.find(group => group.id === id)
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
    // fetch groups
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Organizations/access_groups")
      .searchParam("id", this.organization.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get groups for organization: ${this.organization.id}`, response)
    }

    // parse groups from the server's response
    const groups = (await response!.json()) as AccessGroupsResponse

    // init groups
    for (const gr of groups.groups) {
      // create group implementation
      const group = await new GroupImpl(this.context, this.organization).initFrom(gr.id)

      // add group to the collection
      this._groups.push(group)

      // dispatch event
      this.dispatch({
        type: GroupEvent.ADDED,
        data: group
      })
    }
  }

  async internalCreate(name: string, permits: {
    isAdmin: boolean
  }, memberIds: string[]): Promise<Group> {
    if (name === undefined || name === null) {
      throw new Error("Group create, name is undefined or null")
    }
    if (name.length === 0 || name.trim().length === 0) {
      throw new Error("Group create, name is empty")
    }

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/AccessGroups")
      .sendPostJson({
        name: name,
        organizationId: this.organization.id,
        permits: permits,
        memberIds: memberIds
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to create group, organization: ${this.organization.id}`, response)
    }
    // parse group from the server's response
    const content = (await response!.json()) as AccessGroupResponse

    // create group implementation
    const group = await new GroupImpl(this.context, this.organization).initFrom(content.group.id)

    // add group to the collection
    this._groups.push(group)

    // dispatch event
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

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("/api/v1/AccessGroups")
      .searchParam("groupId", id)
      .sendDelete()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to delete group: ${id}, organization: ${this.organization.id}`, response)
    }

    // delete group from collection
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
