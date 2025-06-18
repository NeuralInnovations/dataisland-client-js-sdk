
import {OrganizationImpl} from "../organizations/organization.impl"
import {Context} from "../../context"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import { ChatbotAccounts } from "./chatbotAccounts"
import { ChatbotAccount } from "./chatbotAccount"
import { ChatbotAccountImpl } from "./chatbotAccount.impl"
import { ChatbotAccountDto, ChatbotAccountType, KeyValueItem } from "../../dto/chatbotAccountResponse"


export class ChatbotAccountsImpl extends ChatbotAccounts {
  private _collection?: ChatbotAccountImpl[]

  constructor(
    public readonly organization: OrganizationImpl,
    public readonly context: Context) {
    super()
  }

  get collection(): ChatbotAccount[] {
    if (this._collection !== undefined) {
      return this._collection
    }else {
      throw new Error("Chatbot accounts collection is not loaded, please update it first")
    }
  }


  async update(): Promise<void> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/ChatbotAccount/list")
      .searchParam("organizationId", this.organization.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Chatbot accounts list for organization ${this.organization.id} failed`,
        response
      )
    }

    this._collection = []
    const accounts = (await response!.json() as {accounts: ChatbotAccountDto[]}).accounts
    this._collection = accounts.map(acc => new ChatbotAccountImpl(this.context, acc))
  }

  async add(type: ChatbotAccountType, name: string, accountId: string, token: string, accountContext: string, notificationDelays: number[], data: KeyValueItem[]): Promise<void> {
    
    if (type === undefined || type === null) {
      throw new Error("Add chatbot account, type can not be null")
    }
    if (name === undefined || name === null || name.trim() === "") {
      throw new Error("Add chatbot account, name can not be null or empty")
    }
    if (accountId === undefined || accountId === null || accountId.trim() === "") {
      throw new Error("Add chatbot account, accountId can not be null or empty")
    }
    if (token === undefined || token === null || token.trim() === "") {
      throw new Error("Add chatbot account, token can not be null or empty")
    }
    if (accountContext === undefined || accountContext === null) {
      throw new Error("Add chatbot account, accountContext can not be null or empty")
    }
    if (notificationDelays === undefined || notificationDelays === null) {
      throw new Error("Add chatbot account, notificationDelays can not be null")
    }
    if (data === undefined || data === null) {
      throw new Error("Add chatbot account, data can not be null")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/ChatbotAccount")
      .sendPostJson({
        organizationId: this.organization.id,
        accountType: type,
        name: name,
        token: token,
        accountId: accountId,
        context: accountContext,
        data: data
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to add chatbot account in organization ${this.organization.id}`, response)
    }

    await this.update()
  }


  async delete(id: string): Promise<void> {
    const account = this._collection?.find(acc => acc.data.id === id)

    // check if account is found
    if (!account) {
      throw new Error(`Chatbot account ${id} is not found, organization: ${this.organization.id}`)
    }

    // send delete request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/ChatbotAccount")
      .searchParam("id", id)
      .sendDelete()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed to delete chatbot account: ${id}, organization: ${this.organization.id}`,
        response
      )
    }

    await this.update()
  }


}
