import {MessengerAccount, MessengerAccountId} from "./messengerAccount"
import {MessengerAccountDto} from "../../dto/messengerResponse"
import {Context} from "../../context"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"


export class MessengerAccountImpl extends MessengerAccount {
  private readonly _id: string
  private readonly _name: string

  constructor(private readonly context: Context, id: string, name: string) {
    super()

    this._id = id
    this._name = name
  }

  get id(): MessengerAccountId {
    return this._id
  }

  get name(): string {
    return this._name
  }


  async data(): Promise<MessengerAccountDto> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Messenger")
      .searchParam("id", this._id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get messenger account data with id ${this._id}`, response)
    }

    return (await response!.json() as { account: MessengerAccountDto }).account
  }

  async update(name: string, accountId: string, token: string, accountContext: string, referralUrl: string): Promise<MessengerAccountDto> {
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Messenger")
      .sendPutJson({
        id: this._id,
        name: name,
        token: token,
        accountContext: accountContext,
        referralUrl: referralUrl,
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to update messenger account with ID: ${this._id}`, response)
    }

    return await this.data()
  }

}
