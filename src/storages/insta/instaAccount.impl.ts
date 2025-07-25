import {InstaAccount, InstaAccountId} from "./instaAccount"
import {AccountStatus, InstaAccountDto,InstaCutAccountDto} from "../../dto/instaResponse"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import {Context} from "../../context"


export class InstaAccountImpl extends InstaAccount {
  private readonly _cutData: InstaCutAccountDto

  constructor(private readonly context: Context, accountCut: InstaCutAccountDto) {
    super()

    this._cutData = accountCut
  }

  get id(): InstaAccountId{
    return this._cutData.id
  }

  get username(): InstaAccountId{
    return this._cutData.username
  }

  get status(): AccountStatus{
    return this._cutData.status
  }

  async data(): Promise<InstaAccountDto> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta")
      .searchParam("instaId", this._cutData.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get insta account data with id ${this._cutData.id}`, response)
    }

    return (await response!.json() as { instaAccount: InstaAccountDto }).instaAccount
  }

  async update(
    enabled: boolean, 
    relogin: boolean, 
    username: string, 
    password: string, 
    twoFactorKey: string, 
    proxy: string,
    additionalContext: string,
    folderId: string,
    cron: string[],
    timezone: string
  ): Promise<InstaAccountDto> {
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta")
      .sendPutJson({
        instaId: this._cutData.id,
        enabled: enabled,
        relogin: relogin,
        username: username,
        password: password,
        twoFactorKey: twoFactorKey,
        proxy: proxy,
        additionalContext: additionalContext,
        folderId: folderId,
        cron: cron,
        timezone: timezone
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to update insta account with ID: ${this._cutData.id}`, response)
    }

    return await this.data()
  }

}
