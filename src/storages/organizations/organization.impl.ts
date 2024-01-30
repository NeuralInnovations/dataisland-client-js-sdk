import { OrganizationId } from "./organizations"
import { Disposable } from "../../disposable"
import { OrganizationDto } from "../../dto/userInfoResponse"
import { Workspaces } from "../workspaces/workspaces"
import { WorkspacesImpl } from "../workspaces/workspaces.impl"
import { Context } from "../../context"
import { Organization } from "./organization"
import { GroupsImpl } from "../groups/groups.impl"
import { Groups } from "../groups/groups"
import { ChatsImpl } from "../chats/chats.impl"
import { Chats } from "../chats/chats"
import { RpcService } from "../services/rpcService"
import { ResponseUtils } from "../services/responseUtils"

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
