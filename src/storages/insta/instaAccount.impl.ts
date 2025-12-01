import {InstaAccount, InstaAccountId, InstaVideoEditingSetting} from "./instaAccount"
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
    conversationContext: string,
    folderId: string,
    postCron: string[],
    postTimezone: string,
    directCron: string[],
    directTimezone: string,
    videoEditingSetting?: InstaVideoEditingSetting
  ): Promise<InstaAccountDto> {
    if (videoEditingSetting !== undefined) {
      if (videoEditingSetting.minSpeedChange === undefined || videoEditingSetting.minSpeedChange === null) {
        throw new Error("Update insta account, videoEditingSetting.minSpeedChange can not be null")
      }
      if (videoEditingSetting.maxSpeedChange === undefined || videoEditingSetting.maxSpeedChange === null) {
        throw new Error("Update insta account, videoEditingSetting.maxSpeedChange can not be null")
      }
      if (videoEditingSetting.minSpeedChange > videoEditingSetting.maxSpeedChange) {
        throw new Error("Update insta account, videoEditingSetting.minSpeedChange can not be greater than maxSpeedChange")
      }
    }

    const form = new FormData()
    form.append("instaId", this._cutData.id)
    form.append("enabled", enabled.toString())
    form.append("relogin", relogin.toString())
    form.append("username", username)
    form.append("password", password)
    form.append("twoFactorKey", twoFactorKey)
    form.append("proxy", proxy)
    form.append("additionalContext", additionalContext)
    form.append("conversationContext", conversationContext)
    form.append("folderId", folderId)
    postCron.forEach(cron => form.append("postCron", cron))
    form.append("postTimezone", postTimezone)
    directCron.forEach(cron => form.append("directCron", cron))
    form.append("directTimezone", directTimezone)

    if (videoEditingSetting !== undefined) {
      form.append("videoMinSpeed", videoEditingSetting.minSpeedChange.toString())
      form.append("videoMaxSpeed", videoEditingSetting.maxSpeedChange.toString())
      if (videoEditingSetting.watermarkFile) {
        form.append("videoWatermarkFile", videoEditingSetting.watermarkFile, videoEditingSetting.watermarkFile.name)
      }
    }

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta")
      .sendPutFormData(form)

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to update insta account with ID: ${this._cutData.id}`, response)
    }

    return await this.data()
  }

}
