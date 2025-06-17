import { Context } from "../../context"
import {
  AccessGroupResponse,
  AccessGroupsResponse
} from "../../dto/accessGroupResponse"
import { RpcService } from "../../services/rpcService"
import { Groups, GroupsEvent } from "./groups"
import { OrganizationImpl } from "../organizations/organization.impl"
import { ResponseUtils } from "../../services/responseUtils"
import { Group, GroupId } from "./group"
import { GroupImpl } from "./group.impl"

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

  async reload(){
    this._groups = []
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

    const wait: Promise<Group>[] = []

    // init groups
    for (const gr of groups.groups) {
      // create group implementation
      const group = new GroupImpl(this.context, this.organization).initFrom(gr.id)

      // add to the wait list
      wait.push(group)
    }

    // wait for all groups
    const groupsResult = await Promise.all(wait)

    // add groups to the collection
    for (const group of groupsResult) {
      // add group to the collection
      this._groups.push(group)
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
      type: GroupsEvent.ADDED,
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
      ?.requestBuilder("api/v1/AccessGroups")
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
      type: GroupsEvent.REMOVED,
      data: group
    })

    // dispose group
    group.dispose()
  }
}
