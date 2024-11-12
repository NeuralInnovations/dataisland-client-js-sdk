import {UsersAdministration} from "./users.administration"
import {SearchUserResponse} from "../../dto/userInfoResponse"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import {Context} from "../../context"


export class UsersAdministrationImpl implements UsersAdministration {

  constructor(private readonly context: Context) {
  }

  async search(email: string): Promise<SearchUserResponse> {
    if (email === undefined || email === null || email.trim() === ""){
      throw new Error("Email is null or empty")
    }
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/users/info/email")
      .searchParam("email", email)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to search user by email", response)
    }

    return await response!.json() as SearchUserResponse
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
