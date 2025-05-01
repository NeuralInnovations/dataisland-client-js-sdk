import {InstaAccount, InstaAccountId} from "./instaAccount"
import {InstaAccountDto} from "../../dto/instaResponse"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import {Context} from "../../context"


export class InstaAccountImpl extends InstaAccount {
  private readonly _id: string

  constructor(private readonly context: Context, id: string) {
    super()

    this._id = id
  }

  get id(): InstaAccountId{
    return this._id
  }

  async data(): Promise<InstaAccountDto> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta")
      .searchParam("instaId", this._id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get insta account data with id ${this._id}`, response)
    }

    return (await response!.json() as { instaAccount: InstaAccountDto }).instaAccount
  }

  async update(name: string, additionalContext: string, folderId: string, token: string, proxy: string): Promise<InstaAccountDto> {
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta")
      .sendPutJson({
        instaId: this._id,
        name: name,
        additionalContext: additionalContext,
        folderId: folderId,
        token: token,
        proxy: proxy
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to update insta account with ID: ${this._id}`, response)
    }

    return await this.data()
  }

}
