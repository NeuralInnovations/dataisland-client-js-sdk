import { Service } from './service'
import { RpcService } from './rpcService'
import { UserEvent, UserProfile } from '../storages/userProfile'
import { UserInfoResponse } from '../dto/userInfoResponse'
import { OrganizationService } from './organizationService'

class UserProfileImpl extends UserProfile {
  private content?: UserInfoResponse

  get id(): string {
    if (this.content) {
      return this.content.user.id
    }
    throw new Error('The profile is not loaded.')
  }

  get name(): string {
    if (this.content) {
      return this.content.user.profile.name
    }
    throw new Error('The profile is not loaded.')
  }

  get email(): string {
    if (this.content) {
      return this.content.user.profile.email
    }
    throw new Error('The profile is not loaded.')
  }

  get isDeleted(): boolean {
    if (this.content) {
      return this.content.user.isDeleted
    }
    throw new Error('The profile is not loaded.')
  }

  get createdAt(): Date {
    if (this.content) {
      return new Date(this.content.user.created_at)
    }
    throw new Error('The profile is not loaded.')
  }

  get modifiedAt(): Date {
    if (this.content) {
      return new Date(this.content.user.modified_at)
    }
    throw new Error('The profile is not loaded.')
  }

  initFrom(content: UserInfoResponse) {
    this.content = content
    this.dispatch({
      type: UserEvent.CHANGED,
      data: this
    })
  }
}

export class UserProfileService extends Service {
  private readonly impl: UserProfileImpl = new UserProfileImpl()

  get userProfile(): UserProfile {
    return this.impl
  }

  async fetch(fireError: boolean = true) {
    const rpc = this.resolve(RpcService) as RpcService
    const response = await rpc.requestBuilder('api/v1/Users/self2').sendGet()
    if (fireError && !response.ok) {
      throw new Error(
        `Failed to fetch user profile. Status: ${response.status},${response.statusText}`
      )
    }
    const content = (await response.json()) as UserInfoResponse
    this.impl.initFrom(content)

    const organizationService = this.resolve(
      OrganizationService
    ) as OrganizationService
    organizationService.initFrom(
      content.adminInOrganization,
      content.organizations,
      content.user.settings
    )
  }
}
