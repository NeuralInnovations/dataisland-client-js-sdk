import { OrganizationId } from "./organizations"
import { Disposable } from "../../disposable"
import {
  CurrentLimitItem,
  CurrentLimitRecordData,
  CurrentLimitsData,
  OrganizationDto,
  OrganizationSegmentData,
  UserDto,
  UserLimitsData,
  UsersStatisticsResponse
} from "../../dto/userInfoResponse"
import { WorkspaceId, Workspaces } from "../workspaces/workspaces"
import { WorkspacesImpl } from "../workspaces/workspaces.impl"
import { Context } from "../../context"
import { Organization } from "./organization"
import { GroupsImpl } from "../groups/groups.impl"
import { Groups } from "../groups/groups"
import { ChatsImpl } from "../chats/chats.impl"
import { Chats } from "../chats/chats"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import { StatisticsResponse } from "../../dto/statisticsResponse"
import {
  LimitActionType,
  SegmentData,
  SegmentsData
} from "../../dto/limitsResponse"
import { FileId } from "../files/file"
import { QuizData } from "../../dto/quizResponse"
import { InviteCodeResponse, InviteResponse } from "../../dto/invitesResponse"
import {
  ApiKeyResponse,
  OrganizationApiKey,
  OrganizationKeysResponse, TokenResponse
} from "../../dto/apiKeyResponse"
import { IconResponse } from "../../dto/workspacesResponse"
import { UploadFile } from "../files/files"
import { QueryFlowsImpl } from "../queryFlows/queryFlows.impl"
import { QueryFlows } from "../queryFlows/queryFlows"
import { OrganizationPromptsImpl } from "./organizationPrompts.impl"
import { OrganizationPrompts } from "./organizationPrompts"
import {InstaAccountsImpl} from "../insta/instaAccounts.impl"
import {InstaAccounts} from "../insta/instaAccounts"
import {MessengerAccountsImpl} from "../messenger/messengerAccounts.impl"
import {MessengerAccounts} from "../messenger/messengerAccounts"
import { ChatbotAccountsImpl } from "../chatbot/chatbotAccounts.impl"
import { ChatbotAccounts } from "../chatbot/chatbotAccounts"

export class OrganizationImpl extends Organization implements Disposable {
  private _isDisposed: boolean = false
  private _isAdmin: boolean = false
  private _content?: OrganizationDto
  private readonly _workspaces: WorkspacesImpl
  private readonly _accessGroups: GroupsImpl
  private readonly _queryFlows: QueryFlowsImpl
  private readonly _instaAccounts: InstaAccountsImpl
  private readonly _messengerAccounts: MessengerAccountsImpl
  private readonly _chatbotAccounts: ChatbotAccountsImpl
  private readonly _chats: ChatsImpl
  private readonly _prompts: OrganizationPromptsImpl

  constructor(private readonly context: Context) {
    super()
    this._workspaces = new WorkspacesImpl(this, this.context)
    this._accessGroups = new GroupsImpl(this, this.context)
    this._chats = new ChatsImpl(this, this.context)
    this._queryFlows = new QueryFlowsImpl(this, this.context)
    this._instaAccounts = new InstaAccountsImpl(this, this.context)
    this._messengerAccounts = new MessengerAccountsImpl(this, this.context)
    this._chatbotAccounts = new ChatbotAccountsImpl(this, this.context)
    this._prompts = new OrganizationPromptsImpl(this, this.context)
  }

  public async initFrom(
    content: OrganizationDto,
    isAdmin: boolean
  ): Promise<OrganizationImpl> {
    this._content = content
    this._isAdmin = isAdmin

    // init workspaces by organization id
    // const promises = [
    //   this._workspaces.initFrom(content.id),
    //   this._chats.initFrom(content.id),
    //   this._accessGroups.initialize()
    // ]

    // await Promise.all(promises)

    return this
  }

  get prompts(): OrganizationPrompts {
    return this._prompts
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
    return <string>this._content?.profile.name
  }

  get description(): string {
    return <string>this._content?.profile.description
  }

  get icon(): string {
    return <string>this._content?.profile.iconId
  }

  get slackWebhookUrl(): string {
    return <string>this._content?.profile.slackWebhookUrl
  }

  get isAllowedInLibraries(): boolean {
    return <boolean>this._content?.profile.isAllowedInLibraries
  }

  get workspaces(): Workspaces {
    return this._workspaces
  }

  get accessGroups(): Groups {
    return this._accessGroups
  }

  get queryFlows(): QueryFlows {
    return this._queryFlows
  }

  get instaAccounts(): InstaAccounts {
    return this._instaAccounts
  }

  get messengerAccounts(): MessengerAccounts {
    return this._messengerAccounts
  }

  get chatbotAccounts(): ChatbotAccounts {
    return this._chatbotAccounts
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

  async change(name: string, description: string, slackWebhookUrl: string): Promise<void> {
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
          description,
          slackWebhookUrl
        }
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to change organization", response)
    }

    if (this._content) {
      this._content.profile.name = name
      this._content.profile.description = description
      this._content.profile.slackWebhookUrl = slackWebhookUrl
    }

    this.fireChanged()
  }

  async uploadIcon(icon: UploadFile): Promise<string> {
    // check icon file
    if (icon === undefined || icon === null) {
      throw new Error("Organization icon upload, file is undefined or null")
    }

    // form data to send
    const form = new FormData()
    form.append("OrganizationId", this.id)
    form.append("FileName", icon.name)
    form.append("File", icon, icon.name)

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Organizations/icon")
      .sendPutFormData(form)

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Organization icon upload ${icon.name}`, response)
    }

    const iconResponse = await response!.json() as IconResponse

    return iconResponse.iconId
  }

  async statistics(dateFrom: Date, dateTo: Date): Promise<StatisticsResponse> {
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Stats/organization")
      .searchParam("organizationId", this.id)
      .searchParam("dateFrom", dateFrom.toISOString())
      .searchParam("dateTo", dateTo.toISOString())
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

  async membersStatistics(dateFrom: Date, dateTo: Date): Promise<UsersStatisticsResponse> {
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Stats/organization/members")
      .searchParam("organizationId", this.id)
      .searchParam("dateFrom", dateFrom.toISOString())
      .searchParam("dateTo", dateTo.toISOString())
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

  async userStatistic(userId: string, dateFrom: Date, dateTo: Date): Promise<StatisticsResponse> {
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Stats/user")
      .searchParam("userId", userId)
      .searchParam("organizationId", this.id)
      .searchParam("dateFrom", dateFrom.toISOString())
      .searchParam("dateTo", dateTo.toISOString())
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
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get limits in organization: ${this.id}`, response)
    }

    // parse limits from the server's response
    const limits = (await response!.json()) as UserLimitsData
    const defaultSegmentKey = "registered_default"

    const currentLimits = {
      segment: limits.userSegment ? limits.userSegment.key : defaultSegmentKey,
      limits: []
      
    } as CurrentLimitsData

    if (!limits) return currentLimits

    for (const limit of limits.userLimits) {
      const type = limit.action as LimitActionType
      const currentItem = {
        action: type,
        records: []
      } as CurrentLimitItem

      if (limit.records.length == 0) continue

      for (const record of limit.records) {
        const segmentRecord = limits.userSegment.dayItems.find(item => item.daysCount == record.daysCount)
        if (segmentRecord == null) {
          throw new Error(`Invalid response during get limits in organization: ${this.id}. Days count with ${type} not found in segment ${limits.userSegment.key}`)
        }
        const actionRecord = segmentRecord?.actionItems.find(item => item.type == type)
        if (actionRecord == null) {
          throw new Error(`Invalid response during get limits in organization: ${this.id}. Type ${type} not found in segment ${limits.userSegment.key}`)
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

  async inviteUsers(emails: string[], accessGroups: string[]): Promise<void> {
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
        `Invite users failed for organization ${this.id}`,
        response
      )
    }
  }

  async createInviteCode(accessGroups: string[], validateDomain?: string): Promise<string> {
    let validateObj = null
    if (validateDomain !== null && validateDomain !== undefined) {
      validateObj = {
        domain: validateDomain
      }
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Invites/link")
      .sendPostJson({
        organizationId: this.id,
        accessGroupIds: accessGroups,
        validation: validateObj
      })
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Invite code creation failed for organization ${this.id}`,
        response
      )
    }

    const json = await response!.json()

    const code = (json as InviteCodeResponse).code

    return code
  }

  async deleteInviteCode(code: string): Promise<void> {
    if (code === undefined || code === null || code.trim() === "") {
      throw new Error("Invite code is required. Please provide a valid code.")
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Invites/link")
      .searchParam("code", code)
      .sendDelete()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed to delete invite for code: ${code}`,
        response
      )
    }
  }

  async getOrganizationInvites(): Promise<InviteResponse> {
    // get invites
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Invites/link/organization")
      .searchParam("organizationId", this.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get invites in organization: ${this.id}`, response)
    }

    const json = await response!.json()

    return json as InviteResponse
  }

  async createApiKey(name: string, accessGroups: string[]): Promise<OrganizationApiKey> {
    if (name === null || name === undefined || name.trim() === "") {
      throw new Error("Name is required. Please provide a valid name.")
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Keys/organization/exist")
      .sendPostJson({
        organizationId: this.id,
        accessGroupIds: accessGroups,
        keyName: name
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `API key creation failed for organization ${this.id}`,
        response
      )
    }

    const json = await response!.json()

    const key = (json as ApiKeyResponse).apiKey

    return key
  }

  async getApiKeys(): Promise<OrganizationApiKey[]> {
    // get invites
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Keys/organization")
      .searchParam("organizationId", this.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get api keys fot organization: ${this.id}`, response)
    }

    const json = await response!.json()

    const keys = (json as OrganizationKeysResponse).keys

    return keys
  }

  async getTokenFromKey(key: string, userId: string, userName: string, userMetadata: string): Promise<TokenResponse> {
    // get invites
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Keys/user/token/jwt")
      .searchParam("apiKey", key)
      .searchParam("userId", userId)
      .searchParam("userName", userName)
      .searchParam("userMetadata", userMetadata)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get token from key for org: ${this.id}`, response)
    }

    const json = await response!.json()

    return json as TokenResponse
  }

  async deleteApiKey(key: string): Promise<void> {
    if (key === null || key === undefined || key.trim() === "") {
      throw new Error("Key is required. Please provide a valid key.")
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Keys/organization")
      .searchParam("apiKey", key)
      .sendDelete()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Api key delete error", response)
    }
  }

  async createQuiz(workspaces: WorkspaceId[], query: string, questionsCount: number, optionsCount: number, fileId: FileId): Promise<QuizData> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Quiz")
      .sendPostJson({
        query: query,
        questionsCount: questionsCount,
        optionsCount: optionsCount,
        organizationId: this.id,
        workspaceIds: workspaces,
        fileId: fileId
      })
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Quiz creation failed for organization ${this.id} with query ${query}`,
        response
      )
    }

    return (await response!.json()) as QuizData
  }

  async deleteOrganizationMember(userIds: string[]): Promise<void> {
    if (userIds === undefined || userIds === null) {
      throw new Error(`Users delete from org ${this.id}, ids array is undefined or null`)
    }
    if (userIds.length === 0) {
      throw new Error(`Users delete from org ${this.id}, array of ids is empty`)
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Organizations/member")
      .searchParam("organizationId", this.id)
      .searchParam("userIds", userIds.toString())
      .sendDelete()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Users delete from org ${this.id} failed`, response)
    }

    this.fireChanged()
  }
}
