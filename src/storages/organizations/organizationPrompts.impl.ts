import { OrganizationPrompts } from "./organizationPrompts"
import { OrganizationImpl } from "./organization.impl"
import { Context } from "../../context"
import { OrganizationPromptDto } from "../../dto/userInfoResponse"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"

export class OrganizationPromptsImpl implements OrganizationPrompts {

  private _cacheDefaultPrompts: OrganizationPromptDto[] | null = null

  constructor(
    private readonly organization: OrganizationImpl,
    private readonly context: Context
  ) {

  }

  async getDefaultPrompts(): Promise<OrganizationPromptDto[]> {
    if (this._cacheDefaultPrompts !== null) {
      return this._cacheDefaultPrompts
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Organizations/prompts/default")
      .searchParam("organizationId", this.organization.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed during fetch of organization prompts ${this.organization.id}`,
        response
      )
    }

    this._cacheDefaultPrompts = (await response!.json() as {
      prompts: OrganizationPromptDto[]
    }).prompts as OrganizationPromptDto[]

    return this._cacheDefaultPrompts
  }

  async getPrompts(): Promise<OrganizationPromptDto[]> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Organizations/prompts")
      .searchParam("organizationId", this.organization.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed during fetch of organization prompts ${this.organization.id}`,
        response
      )
    }

    return (await response!.json() as {
      prompts: OrganizationPromptDto[]
    }).prompts as OrganizationPromptDto[]
  }

  async updatePrompts(prompts: OrganizationPromptDto[]): Promise<void> {
    if (prompts === undefined || prompts === null || prompts.length === 0) {
      return
    }
    for (let i = 0; i < prompts.length; i++) {
      const prompt = prompts[i]
      if (prompt === undefined || prompt === null) {
        throw new Error("list of prompts has null item at index: " + i)
      }
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Organizations/prompts")
      .searchParam("organizationId", this.organization.id)
      .sendPutJson(prompts)

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed during update organization's list of prompts ${this.organization.id}`,
        response
      )
    }
  }

  async updatePrompt(key: string, value: string | null): Promise<void> {
    return this.updatePrompts([{
      key,
      value
    }])
  }

  deletePrompt(key: string): Promise<void> {
    return this.updatePrompt(key, null)
  }

  async deletePrompts(keys: string[]): Promise<void> {
    return this.updatePrompts(keys.map(key => ({
      key,
      value: null
    })))
  }

}
