import {UsersAdministration} from "./users.administration"
import {
  SearchUsersResponse
} from "../../dto/userInfoResponse"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import {Context} from "../../context"


export class UsersAdministrationImpl implements UsersAdministration {

  constructor(private readonly context: Context) {
  }

  async search(query: string | undefined, email: string | undefined, userId: string | undefined, limit: number, page: number): Promise<SearchUsersResponse> {

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/users/info/search")
      .searchParam("query", query)
      .searchParam("email", email)
      .searchParam("userId", userId)
      .searchParam("limit", limit.toString())
      .searchParam("page", page.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to search user by email", response)
    }

    return await response!.json() as SearchUsersResponse
  }

  async setUserSegment(email: string, userId: string, segmentKey: string): Promise<void> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/users/limits/segment")
      .sendPutJson({
        userEmail: email,
        userId: userId,
        segmentKey: segmentKey
      })
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Set segment ${segmentKey} for user ${email}, id ${userId} failed`,
        response
      )
    }
  }

}
