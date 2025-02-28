import {ChatCount, ChatListResponse} from "../../dto/chatResponse"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import {Context} from "../../context"
import {ChatsAdministration} from "./chats.administration"


export class ChatsAdministrationImpl extends ChatsAdministration {
  private context: Context

  constructor(context: Context) {
    super()
    this.context = context
  }

  /*  
  Get user chats
  */
  async userChats(userId: string, organizationId: string, limit: number, page: number): Promise<ChatListResponse>{
    if (userId === undefined || userId === null || userId.trim() === "") {
      throw new Error("userId is required, must be not empty")
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/chats")
      .searchParam("userId", userId)
      .searchParam("organizationId", organizationId)
      .searchParam("limit", limit.toString())
      .searchParam("page", page.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to get user chats", response)
    }

    return await response!.json() as ChatListResponse
  }

  /*
  Send Message to chat
  */
  async sendMessageToChat( chatId: string, message: string): Promise<void>{
    if (chatId === undefined || chatId === null || chatId.trim() === "") {
      throw new Error("chatId is required, must be not empty")
    }

    if (message === undefined || message === null || message.trim() === "") {
      throw new Error("payId is required, must be not empty")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/chat/message/chat")
      .sendPostJson({
        chatId: chatId,
        message: message,
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to send message: ${message} for chat id ${chatId}`, response)
    }

    return await response!.json() as void
  }

  /*
  Send Message to users
   */
  async sendMessageToUsers( message: string, organizationIdFilter: string, platformFilter: number = 0, activityInMinutesFilter: number = 0, stageFilter: number = 0): Promise<ChatCount>{
    if (message === undefined || message === null || message.trim() === "") {
      throw new Error("userId is required, must be not empty")
    }
    
    if (organizationIdFilter === undefined || organizationIdFilter === null || organizationIdFilter.trim() === "") {
      throw new Error("organizationIdFilter is required, must be not empty")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/chat/message/users")
      .sendPostJson({
        message: message,
        organizationIdFilter: organizationIdFilter,
        platformFilter: platformFilter,
        activityInMinutesFilter: activityInMinutesFilter,
        stageFilter: stageFilter
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to send message: ${message} for platformFilter ${platformFilter}`, response)
    }

    return await response!.json() as ChatCount
  }
}
