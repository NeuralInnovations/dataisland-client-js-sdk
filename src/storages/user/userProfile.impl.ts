import { UserEvent, UserProfile } from "./userProfile"
import { UserInfoResponse } from "../../dto/userInfoResponse"
import { Context } from "../../context"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import { UserProfileService } from "../../services/userProfileService"
import {InviteResponse} from "../../dto/invitesResponse"

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

  get educationalInstitution(): string {
    if (this.content){
      return this.content.user.profile.educationalInstitution
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

  async fetch() : Promise<void>{
    await this.context.resolve(UserProfileService)?.fetch()
  }

  async updateUser(name: string, binanceId: string, educationalInstitution: string): Promise<void>{
    if (!this.content) {
      throw new Error("User is not loaded.")
    }

    if (name === this.name && binanceId === this.binanceId && educationalInstitution === this.educationalInstitution) {
      return Promise.resolve()
    }
    
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Users")
      .sendPutJson({
        profile: {
          name,
          binanceId,
          educationalInstitution
        }
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to change organization", response)
    }

    if (this.content) {
      this.content!.user.profile.name = name
      this.content!.user.profile.binanceId = binanceId
      this.content!.user.profile.educationalInstitution = educationalInstitution
    }

    this.dispatch({
      type: UserEvent.CHANGED,
      data: this
    })
  }

  async getUserInvites(): Promise<InviteResponse>{
    // get invites
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Invites/link/user")
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to get invites for current user", response)
    }

    const json = await response!.json()

    return json as InviteResponse
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
