import {MessengerAccounts} from "./messengerAccounts"
import {MessengerAccountImpl} from "./messengerAccount.impl"
import {OrganizationImpl} from "../organizations/organization.impl"
import {Context} from "../../context"
import {MessengerAccount} from "./messengerAccount"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import {MessengerAccountCutDto} from "../../dto/messengerResponse"


export class MessengerAccountsImpl extends MessengerAccounts {
  private _collection?: MessengerAccountImpl[]

  constructor(
    public readonly organization: OrganizationImpl,
    public readonly context: Context) {
    super()
  }

  get collection(): MessengerAccount[] {
    if (this._collection !== undefined) {
      return this._collection
    }else {
      throw new Error("Messenger accounts collection is not loaded, please update it first")
    }
  }


  async update(): Promise<void> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Messenger/list")
      .searchParam("organizationId", this.organization.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Messenger accounts list for organization ${this.organization.id} failed`,
        response
      )
    }

    this._collection = []
    const accounts = (await response!.json() as {accounts: MessengerAccountCutDto[]}).accounts
    this._collection = accounts.map(acc => new MessengerAccountImpl(this.context, acc.id, acc.name))
  }

  async add(name: string, accountId: string, token: string, language: string, accountContext: string, referralUrl: string): Promise<void> {
    if (name === undefined || name === null || name.trim() === "") {
      throw new Error("Add messenger account, name can not be null or empty")
    }
    if (accountId === undefined || accountId === null || accountId.trim() === "") {
      throw new Error("Add messenger account, accountId can not be null or empty")
    }
    if (token === undefined || token === null || token.trim() === "") {
      throw new Error("Add messenger account, token can not be null or empty")
    }
    if (language === undefined || language === null) {
      throw new Error("Add messenger account, language can not be null or empty")
    }
    if (accountContext === undefined || accountContext === null) {
      throw new Error("Add messenger account, accountContext can not be null or empty")
    }
    if (referralUrl === undefined || referralUrl === null) {
      throw new Error("Add messenger account, referralUrl can not be null")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Messenger")
      .sendPostJson({
        name: name,
        organizationId: this.organization.id,
        token: token,
        accountId: accountId,
        language: language,
        accountContext: accountContext,
        referralUrl: referralUrl
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to add messenger account in organization ${this.organization.id}`, response)
    }

    await this.update()
  }


  async delete(id: string): Promise<void> {
    const account = this._collection?.find(acc => acc.id === id)

    // check if account is found
    if (!account) {
      throw new Error(`Messenger account ${id} is not found, organization: ${this.organization.id}`)
    }

    // send delete request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Messenger")
      .searchParam("id", id)
      .sendDelete()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed to delete messenger account: ${id}, organization: ${this.organization.id}`,
        response
      )
    }

    await this.update()
  }


}
