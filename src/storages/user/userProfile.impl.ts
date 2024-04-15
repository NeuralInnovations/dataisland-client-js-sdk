import { UserEvent, UserProfile } from "./userProfile"
import { UserInfoResponse } from "../../dto/userInfoResponse"
import { Context } from "../../context"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"

export class UserProfileImpl extends UserProfile {
  private content?: UserInfoResponse


  constructor(private readonly context: Context) {
    super()
  }

  get id(): string {
    if (this.content) {
      return this.content.user.id
    }
    throw new Error("The profile is not loaded.")
  }

  get name(): string {
    if (this.content) {
      return this.content.user.profile.name
    }
    throw new Error("The profile is not loaded.")
  }

  get email(): string {
    if (this.content) {
      return this.content.user.profile.email
    }
    throw new Error("The profile is not loaded.")
  }

  get binanceId(): string {
    if (this.content) {
      return this.content.user.profile.binanceId
    }
    throw new Error("The profile is not loaded.")
  }

  get isDeleted(): boolean {
    if (this.content) {
      return this.content.user.isDeleted
    }
    throw new Error("The profile is not loaded.")
  }

  get isAnonymous(): boolean {
    if (this.content) {
      return this.content.user.isAnonymousMode
    }
    throw new Error("The profile is not loaded.")
  }

  get createdAt(): Date {
    if (this.content) {
      return new Date(this.content.user.created_at)
    }
    throw new Error("The profile is not loaded.")
  }

  get modifiedAt(): Date {
    if (this.content) {
      return new Date(this.content.user.modified_at)
    }
    throw new Error("The profile is not loaded.")
  }

  initFrom(content: UserInfoResponse) {
    this.content = content
    this.dispatch({
      type: UserEvent.CHANGED,
      data: this
    })
  }

  async updateUser(newName: string, newId: string): Promise<void>{
    if (!this.content) {
      throw new Error("User is not loaded.")
    }

    if (newName === this.name && newId === this.binanceId) {
      return Promise.resolve()
    }
    
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Users")
      .sendPutJson({
        profile: {
          newName,
          undefined,
          newId,
        }
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to change organization", response)
    }

    if (this.content) {
      this.content!.user.profile.name = newName
      this.content!.user.profile.binanceId = newId
    }

    this.dispatch({
      type: UserEvent.CHANGED,
      data: this
    })
  }

  async deleteUser(): Promise<boolean>{
    const response = await this.context
      .resolve(RpcService)?.
      requestBuilder("/api/v1/Users/self")
      .sendDelete()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to delete user", response)
    }

    return true
  }

}
