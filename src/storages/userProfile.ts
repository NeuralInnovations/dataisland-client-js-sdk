import { EventDispatcher } from "../events"

export type UserId = string

export enum UserEvent {
  CHANGED = "changed"
}

export abstract class UserProfile extends EventDispatcher<
  UserEvent,
  UserProfile
> {
  /**
   * User id.
   */
  abstract get id(): UserId

  /**
   * User name.
   */
  abstract get name(): string

  /**
   * User email.
   */
  abstract get email(): string

  /**
   * Is user deleted.
   */
  abstract get isDeleted(): boolean

  /**
   * Created at.
   */
  abstract get createdAt(): Date

  /**
   * Modified at.
   */
  abstract get modifiedAt(): Date
}
