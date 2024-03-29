import { Service } from "./service"
import { RpcService } from "./rpcService"
import { UserProfile } from "../storages/user/userProfile"
import { UserInfoResponse } from "../dto/userInfoResponse"
import { OrganizationService } from "./organizationService"
import { UserProfileImpl } from "../storages/user/userProfile.impl"
import { ResponseUtils } from "./responseUtils"

export class UserProfileService extends Service {
  private readonly impl: UserProfileImpl = new UserProfileImpl()

  get userProfile(): UserProfile {
    return this.impl
  }

  async merge(anonymous_token: string) {
    const rpc = this.resolve(RpcService) as RpcService
    const response = await rpc.requestBuilder("api/v1/Users/anonymous/merge")
      .sendPostJson({
        anonymousToken: anonymous_token
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to merge anonymous user", response)
    }

    await this.fetch()
  }

  async fetch() {
    const rpc = this.resolve(RpcService) as RpcService
    const response = await rpc.requestBuilder("api/v1/Users/self2").sendGet()
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to fetch user profile", response)
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
