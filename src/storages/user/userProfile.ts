import { EventDispatcher } from "../../events"

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
   * Additional binance ID
   */
  abstract get binanceId(): string

  /**
   * Additional educational institution
   */
  abstract get educationalInstitution() : string

  /**
   * Is user deleted.
   */
  abstract get isDeleted(): boolean

  /**
   * Is user anonymous
   */
  abstract get isAnonymous(): boolean

  /**
   * Created at.
   */
  abstract get createdAt(): Date

  /**
   * Modified at.
   */
  abstract get modifiedAt(): Date

  /**
   * Update user profile
   * @param newName
   * @param newId
   * @param newEducationalInstitution
   */
  abstract updateUser(newName: string, newId: string, newEducationalInstitution: string): Promise<void>

  /**
   * Delete User
   */
  abstract deleteUser(): Promise<boolean>
}
