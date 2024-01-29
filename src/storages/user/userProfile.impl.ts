import { UserEvent, UserProfile } from "./userProfile"
import { UserInfoResponse } from "../../dto/userInfoResponse"

export class UserProfileImpl extends UserProfile {
  private content?: UserInfoResponse

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

  get isDeleted(): boolean {
    if (this.content) {
      return this.content.user.isDeleted
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
}
