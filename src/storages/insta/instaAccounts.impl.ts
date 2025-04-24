import {InstaAccounts} from "./instaAccounts"
import {InstaCutAccountDto, InstaPostResult} from "../../dto/instaResponse"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import {OrganizationImpl} from "../organizations/organization.impl"
import {Context} from "../../context"
import {InstaAccountImpl} from "./instaAccount.impl"
import {InstaAccount} from "./instaAccount"


export class InstaAccountsImpl extends InstaAccounts {
  private _collection?: InstaAccountImpl[]

  constructor(
    public readonly organization: OrganizationImpl,
    public readonly context: Context) {
    super()
  }


  get collection(): InstaAccount[] {
    if (this._collection !== undefined) {
      return this._collection
    } else {
      throw new Error("Insta accounts collection is not loaded, please update it first")
    }
  }


  async update(): Promise<void> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta/list")
      .searchParam("organizationId", this.organization.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Insta accounts list for organization ${this.organization.id} failed`,
        response
      )
    }

    const accounts = (await response!.json() as {instaAccounts: InstaCutAccountDto[]}).instaAccounts

    this._collection = accounts.map(acc => new InstaAccountImpl(this.context, acc.id))
  }

  async add(name: string, token: string, accountId: string, additionalContext: string, folderId: string): Promise<void> {
    if (name === undefined || name === null || name.trim() === "") {
      throw new Error("Add insta account, name can not be null or empty")
    }
    if (token === undefined || token === null || token.trim() === "") {
      throw new Error("Add insta account, token can not be null or empty")
    }
    if (accountId === undefined || accountId === null || accountId.trim() === "") {
      throw new Error("Add insta account, accountId can not be null or empty")
    }
    if (additionalContext === undefined || additionalContext === null) {
      throw new Error("Add insta account, additionalContext can not be null")
    }
    if (folderId === undefined || folderId === null || folderId.trim() === "") {
      throw new Error("Add insta account, folderId can not be null or empty")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta")
      .sendPostJson({
        name: name,
        organizationId: this.organization.id,
        token: token,
        accountId: accountId,
        additionalContext: additionalContext,
        folderId: folderId
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to add insta account in organization ${this.organization.id}`, response)
    }

    await this.update()

  }


  async delete(id: string): Promise<void> {
    const account = this._collection?.find(acc => acc.id === id)

    // check if account is found
    if (!account) {
      throw new Error(`Insta account ${id} is not found, organization: ${this.organization.id}`)
    }

    // send delete request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta")
      .searchParam("instaId", id)
      .sendDelete()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed to delete insta account: ${id}, organization: ${this.organization.id}`,
        response
      )
    }

    await this.update()
  }

  async post(message: string): Promise<InstaPostResult> {
    if (message === undefined || message === null || message.trim() === "") {
      throw new Error("Add insta post, message can not be null or empty")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta/post")
      .sendPostJson({
        organizationId: this.organization.id,
        message: message
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to add post for insta accounts in organization ${this.organization.id}`, response)
    }


    return (await response!.json()) as InstaPostResult
  }


}
