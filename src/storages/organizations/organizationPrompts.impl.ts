import { OrganizationPrompts } from "./organizationPrompts"
import { OrganizationImpl } from "./organization.impl"
import { Context } from "../../context"
import { OrganizationPromptDto } from "../../dto/userInfoResponse"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"

export class OrganizationPromptsImpl extends OrganizationPrompts {

  private _cacheDefaultPrompts: Map<string, OrganizationPromptDto[]> = new Map<string, OrganizationPromptDto[]>()

  constructor(
    private readonly organization: OrganizationImpl,
    private readonly context: Context
  ) {
    super()
  }

  assertSourceName(sourceName: string): void {
    if (sourceName === undefined || sourceName === null || sourceName.trim() === "") {
      throw new Error("Source name is empty or null")
    }
    if (!this.sourceNames.includes(sourceName)) {
      throw new Error("Source name is not supported")
    }
  }

  async getDefaultPrompts(sourceName: string): Promise<OrganizationPromptDto[]> {
    this.assertSourceName(sourceName)
    if (sourceName === undefined || sourceName === null || sourceName.trim() === "") {
      throw new Error("Source name is empty or null")
    }

    if (this._cacheDefaultPrompts.get(sourceName) !== undefined) {
      return this._cacheDefaultPrompts.get(sourceName)!
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Prompts/organization/default")
      .searchParam("organizationId", this.organization.id)
      .searchParam("sourceName", sourceName)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed during fetch of organization prompts ${this.organization.id}`,
        response
      )
    }

    this._cacheDefaultPrompts.set(sourceName, (await response!.json() as {
      prompts: OrganizationPromptDto[]
    }).prompts as OrganizationPromptDto[])

    return this._cacheDefaultPrompts.get(sourceName)!
  }

  async getPrompts(sourceName: string): Promise<OrganizationPromptDto[]> {
    this.assertSourceName(sourceName)
    if (sourceName === undefined || sourceName === null || sourceName.trim() === "") {
      throw new Error("Source name is empty or null")
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Prompts/organization")
      .searchParam("organizationId", this.organization.id)
      .searchParam("sourceName", sourceName)
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

  async updatePrompts(sourceName: string, prompts: OrganizationPromptDto[]): Promise<void> {
    this.assertSourceName(sourceName)
    if (sourceName === undefined || sourceName === null || sourceName.trim() === "") {
      throw new Error("Source name is empty or null")
    }
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
      ?.requestBuilder("api/v1/Prompts/organization")
      .sendPutJson(
        {
          "organizationId": this.organization.id,
          "sourceName": sourceName,
          "prompts": prompts
        })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed during update organization's list of prompts ${this.organization.id}`,
        response
      )
    }
  }

  async updatePrompt(sourceName: string, key: string, value: string | null): Promise<void> {
    this.assertSourceName(sourceName)
    return this.updatePrompts(sourceName, [{
      key,
      value
    }])
  }

  deletePrompt(sourceName: string, key: string): Promise<void> {
    this.assertSourceName(sourceName)
    return this.updatePrompt(sourceName, key, null)
  }

  async deletePrompts(sourceName: string, keys: string[]): Promise<void> {
    this.assertSourceName(sourceName)
    return this.updatePrompts(sourceName, keys.map(key => ({
      key,
      value: null
    })))
  }

}
