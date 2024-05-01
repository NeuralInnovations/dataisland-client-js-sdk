import { Service } from "./service"
import { RpcService } from "./rpcService"
import { UserProfile } from "../storages/user/userProfile"
import { UserInfoResponse } from "../dto/userInfoResponse"
import { OrganizationService } from "./organizationService"
import { UserProfileImpl } from "../storages/user/userProfile.impl"
import { ResponseUtils } from "./responseUtils"
import { OrganizationsEvent } from "../storages/organizations/organizations"

export class UserProfileService extends Service {
  private readonly impl: UserProfileImpl = new UserProfileImpl(this.context)

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
    const response = await rpc.requestBuilder("api/v2/Users/self").sendGet()
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

    organizationService.organizations.subscribe(async (event) => {
      this.updateUserActiveOrganization(event.data.id, content.user.settings!.activeWorkspaceId)
    }, OrganizationsEvent.CURRENT_CHANGED)
  }

  async updateUserActiveOrganization(activeOrgId: string, activeWorkspaceId: string): Promise<void>{
    const rpc = this.resolve(RpcService) as RpcService
    const response = await rpc.requestBuilder("api/v1/Users/settings").sendPutJson({
      settings: {
        activeOrganizationId: activeOrgId,
        activeWorkspaceId: activeWorkspaceId
      }
    })
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to update user settings", response)
    }
  }
}
