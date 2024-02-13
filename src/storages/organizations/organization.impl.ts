import { OrganizationId } from "./organizations"
import { Disposable } from "../../disposable"
import { OrganizationDto } from "../../dto/userInfoResponse"
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
