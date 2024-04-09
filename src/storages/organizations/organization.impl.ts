import { OrganizationId } from "./organizations"
import { Disposable } from "../../disposable"
import { CurrentLimitItem, CurrentLimitRecordData, CurrentLimitsData, OrganizationDto, OrganizationSegmentData, UserDto, UserLimitsData, UsersStatisticsResponse } from "../../dto/userInfoResponse"
import { Workspaces } from "../workspaces/workspaces"
import { WorkspacesImpl } from "../workspaces/workspaces.impl"
import { Context } from "../../context"
import { Organization, OrganizationEvent } from "./organization"
import { GroupsImpl } from "../groups/groups.impl"
import { Groups } from "../groups/groups"
import { ChatsImpl } from "../chats/chats.impl"
import { Chats } from "../chats/chats"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import { StatisticsResponse } from "../../dto/statisticsResponse"
import { LimitActionType, SegmentData, SegmentsData } from "../../dto/limitsResponse"

export class OrganizationImpl extends Organization implements Disposable {
  private _isDisposed: boolean = false
  private _isAdmin: boolean = false
  private _content?: OrganizationDto
  private readonly _workspaces: WorkspacesImpl
  private readonly _accessGroups: GroupsImpl
  private readonly _chats: ChatsImpl

  constructor(private readonly context: Context) {
    super()
    this._workspaces = new WorkspacesImpl(this, this.context)
    this._accessGroups = new GroupsImpl(this, this.context)
    this._chats = new ChatsImpl(this, this.context)
  }

  public async initFrom(
    content: OrganizationDto,
    isAdmin: boolean
  ): Promise<OrganizationImpl> {
    this._content = content
    this._isAdmin = isAdmin

    // init workspaces by organization id
    await this._workspaces.initFrom(content.id)
    await this._chats.initFrom(content.id)
    await this._accessGroups.initialize()

    return this
  }

  get isAdmin(): boolean {
    return this._isAdmin
  }

  get isDisposed(): boolean {
    return this._isDisposed
  }

  dispose(): void {
    this._isDisposed = true
  }

  get id(): OrganizationId {
    return <OrganizationId>this._content?.id
  }

  get name(): string {
    return <OrganizationId>this._content?.profile.name
  }

  get description(): string {
    return <OrganizationId>this._content?.profile.description
  }

  get workspaces(): Workspaces {
    return this._workspaces
  }

  get accessGroups(): Groups {
    return this._accessGroups
  }

  get chats(): Chats {
    return this._chats
  }

  async members(): Promise<UserDto[]> {
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Organizations/members")
      .searchParam("id", this.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed during fetch of organization members ${this.id}`,
        response
      )
    }

    return (await response!.json() as {
      members: UserDto[]
    }).members as UserDto[]
  }

  async change(name: string, description: string): Promise<void> {
    if (!this._content) {
      throw new Error("Organization is not loaded.")
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
      ?.requestBuilder("api/v1/Organizations")
      .sendPutJson({
        organizationId: this.id,
        profile: {
          name,
          description
        }
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to change organization", response)
    }

    if (this._content) {
      this._content.profile.name = name
      this._content.profile.description = description
    }

    this.dispatch({
      type: OrganizationEvent.CHANGED,
      data: this
    })
  }

  async statistics(dateFrom: number, dateTo: number): Promise<StatisticsResponse> {
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Stats/organization")
      .searchParam("organizationId", this.id)
      .searchParam("dateFrom", dateFrom.toString())
      .searchParam("dateTo", dateTo.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed during fetch of organization statistics ${this.id}`,
        response
      )
    }

    return await response!.json() as StatisticsResponse
  }

  async membersStatistics(dateFrom: number, dateTo: number): Promise<UsersStatisticsResponse> {
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Stats/organization/members")
      .searchParam("organizationId", this.id)
      .searchParam("dateFrom", dateFrom.toString())
      .searchParam("dateTo", dateTo.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed during fetch of organization members statistics ${this.id}`,
        response
      )
    }

    return await response!.json() as UsersStatisticsResponse
  }

  async userStatistic(userId: string, dateFrom: number, dateTo: number): Promise<StatisticsResponse> {
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Stats/user")
      .searchParam("userId", userId)
      .searchParam("organizationId", this.id)
      .searchParam("dateFrom", dateFrom.toString())
      .searchParam("dateTo", dateTo.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed during fetch of user statistics ${this.id}`,
        response
      )
    }

    return await response!.json() as StatisticsResponse
  }

  async userLimits(): Promise<CurrentLimitsData> {
    // fetch limits
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Users/limits")
      .searchParam("organizationId", this.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get limits in organization: ${this.id}`, response)
    }

    // parse limits from the server's response
    const limits = (await response!.json()) as UserLimitsData

    const currentLimits = { segment: limits.userSegment.key, limits : [] } as CurrentLimitsData
    for (const limit of limits.userLimits){
      const type = limit.action as LimitActionType
      const currentItem = { action : type, records: []} as CurrentLimitItem

      if (limit.records.length == 0) continue

      for (const record of limit.records) {
        const segmentRecord = limits.userSegment.dayItems.find(item => item.daysCount == record.daysCount)
        if (segmentRecord == null){
          await ResponseUtils.throwError(`Invalid response during get limits in organization: ${this.id}. Days count with ${type} not found in segment ${limits.userSegment.key}`, response)
          continue
        }
        const actionRecord = segmentRecord?.actionItems.find(item => item.type == type)
        if (actionRecord == null){
          await ResponseUtils.throwError(`Invalid response during get limits in organization: ${this.id}. Type ${type} not found in segment ${limits.userSegment.key}`, response)
          continue
        }

        const currentRecord = {} as CurrentLimitRecordData
        currentRecord.daysCount = record.daysCount
        currentRecord.activeTill = record.activeTill
        currentRecord.all = actionRecord?.tokenLimit ?? actionRecord?.countLimit 
        
        const available = record.tokenLimit ?? record.countLimit   
        currentRecord.used = currentRecord.all - available

        currentItem.records.push(currentRecord)
      }

      currentLimits.limits.push(currentItem)
    }

    return currentLimits
  }

  async organizationLimits(): Promise<SegmentData> {
    // fetch limits
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Descriptions/limits/organization")
      .searchParam("organizationId", this.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get limits in organization: ${this.id}`, response)
    }

    const json = await response!.json()

    // parse limits from the server's response
    const limits = (json as OrganizationSegmentData).segment

    return limits
  }

  async limitSegments(): Promise<SegmentData[]> {
    // fetch limits
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Descriptions/limits/segments")
      .searchParam("organizationId", this.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get limits in organization: ${this.id}`, response)
    }
    const json = await response!.json()

    // parse limits from the server's response
    const limits = (json as SegmentsData).segments

    return limits
  }

  async createInviteLink(emails: string[], accessGroups: string[]): Promise<void> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Invites")
      .sendPostJson({
        organizationId: this.id,
        emails: emails,
        accessGroupIds: accessGroups
      })
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Invite link creation failed for organization ${this.id}`,
        response
      )
    }
  }
}
