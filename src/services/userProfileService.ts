import { Service } from './service'
import { RpcService } from './rpcService'
import { UserProfile } from '../storages/userProfile'
import { UserInfoResponse } from '../dto/userInfoResponse'
import { OrganizationService } from './organizationService'
import { UserProfileImpl } from '../storages/userProfile.impl'

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

    // init user profile from the server's response
    this.impl.initFrom(content)

    const organizationService = this.resolve(
      OrganizationService
    ) as OrganizationService

    // init organization service from user profile
    await organizationService.initFrom(
      content.adminInOrganization,
      content.organizations,
      content.user.settings
    )
  }
}
