
import {Context} from "../../context"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import { ChatbotAccount } from "./chatbotAccount"
import { ChatbotAccountDto, KeyValueItem } from "../../dto/chatbotAccountResponse"


export class ChatbotAccountImpl extends ChatbotAccount {
  private readonly _data: ChatbotAccountDto

  constructor(private readonly context: Context, data: ChatbotAccountDto) {
    super()

    this._data = data
  }

  get data(): ChatbotAccountDto {
    return this._data
  }

  async update(name: string, token: string, accountContext: string, notificationDelays: number[], data: KeyValueItem[]){
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("/api/v1/ChatbotAccount")
      .sendPutJson({
        id: this._data.id,
        name: name,
        token: token,
        context: accountContext,
        notificationDelays: notificationDelays,
        data: data
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to update chatbot account with ID: ${this._data.id}`, response)
    }

  }

}
