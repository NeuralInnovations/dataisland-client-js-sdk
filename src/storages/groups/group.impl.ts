import { Group, GroupEvent, GroupId } from "./group"
import { Disposable } from "../../disposable"
import {
  AccessGroupDto,
  AccessGroupResponse
} from "../../dto/accessGroupResponse"
import { UserDto } from "../../dto/userInfoResponse"
import { Workspace } from "../workspaces/workspace"
import { Context } from "../../context"
import { Organization } from "../organizations/organization"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import { WorkspacesResponse } from "../../dto/workspacesResponse"
import { WorkspaceId } from "../workspaces/workspaces"
import { UserId } from "../user/userProfile"

export class GroupImpl extends Group implements Disposable {
  private _isDisposed: boolean = false
  private _content?: AccessGroupDto
  private _members?: UserDto[]
  private _workspaces: Workspace[] = []
  private _id?: GroupId

  constructor(
    private readonly context: Context,
    public readonly organization: Organization
  ) {
    super()
  }

  async initFrom(id: GroupId): Promise<Group> {
    // set id
    this._id = id

    // reload group and workspaces
    const groupPromise = this.reloadGroup(id)
    const workspacePromise = this.reloadWorkspaces(id)

    // wait for all promises
    await Promise.all([groupPromise, workspacePromise])

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

  async reloadWorkspaces(id: GroupId): Promise<void> {
    const groupWorkspaces = await this.loadWorkspaces(id)
    this._workspaces.length = 0
    this._workspaces.push(...groupWorkspaces)
  }

  async loadWorkspaces(groupId: GroupId): Promise<Workspace[]> {
    // fetch workspaces
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/AccessGroups/workspaces")
      .searchParam("groupId", groupId)
      .sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get workspaces for group: ${this.id}, organization: ${this.organization.id}`, response)
    }

    // parse workspaces from the server's response
    const workspaces = (await response!.json()) as WorkspacesResponse

    // get workspaces
    const result: Workspace[] = []
    for (const workspaceDto of workspaces.workspaces) {
      result.push(this.organization.workspaces.get(workspaceDto.id))
    }

    return result
  }

  get id(): GroupId {
    if (this._id) {
      return this._id
    }
    throw new Error("Access group is not loaded.")
  }

  get group(): AccessGroupDto {
    if (this._content) {
      return this._content
    }
    throw new Error("Access group is not loaded.")
  }

  get workspaces(): readonly Workspace[] {
    return this._workspaces
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

    // change name
    if (this._content) {
      this._content.name = name
    }

    // dispatch event
    this.dispatch({
      type: GroupEvent.UPDATED,
      data: this
    })
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

    // reload workspaces
    await this.reloadWorkspaces(this.id)

    // dispatch event
    this.dispatch({
      type: GroupEvent.UPDATED,
      data: this
    })
  }

  async removeWorkspaces(workspaces: WorkspaceId[]): Promise<void> {
    if (workspaces === null || workspaces === undefined) {
      throw new Error("Group removeWorkspaces, workspaces is undefined or null")
    }

    // make set of workspaces
    const groupWorkspaces = new Set(this.workspaces.map(w => w.id))

    // check argument
    if (!workspaces.every(w => groupWorkspaces.has(w))) {
      const notExistingWorkspaces = workspaces.filter(workspaceId => !groupWorkspaces.has(workspaceId))
      throw new Error(`Group removeWorkspaces, workspaces contains not existing workspaces: ${notExistingWorkspaces}`)
    }

    // remove workspaces
    for (const id of workspaces) {
      groupWorkspaces.delete(id)
    }

    // send request to the server
    await this.setWorkspaces(Array.from(groupWorkspaces))
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

    // dispatch event
    this.dispatch({
      type: GroupEvent.UPDATED,
      data: this
    })
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
