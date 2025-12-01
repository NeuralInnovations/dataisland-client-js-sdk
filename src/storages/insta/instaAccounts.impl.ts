import {InstaAccounts} from "./instaAccounts"
import {
  InstaCutAccountDto,
  InstaErrorDto,
  InstaPostDto,
  PostStatus,
} from "../../dto/instaResponse"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import {OrganizationImpl} from "../organizations/organization.impl"
import {Context} from "../../context"
import {InstaAccountImpl} from "./instaAccount.impl"
import {InstaAccount, InstaVideoEditingSetting} from "./instaAccount"
import {InstaPostImpl} from "./instaPost.impl"
import {InstaPost} from "./instaPost"


export class InstaAccountsImpl extends InstaAccounts {
  private _accounts?: InstaAccountImpl[]
  private _posts?: InstaPostImpl[]
  private _errors?: InstaErrorDto[]


  private _inProgress: InstaPostImpl[] = []

  private _fetchTimeout?: NodeJS.Timeout

  constructor(
    public readonly organization: OrganizationImpl,
    public readonly context: Context) {
    super()
  }


  get accounts(): InstaAccount[] {
    if (this._accounts !== undefined) {
      return this._accounts
    } else {
      throw new Error("Insta accounts collection is not loaded, please update it first")
    }
  }

  get posts(): InstaPost[] {
    if (this._posts !== undefined) {
      return this._posts
    } else {
      throw new Error("Insta posts collection is not loaded, please update it first")
    }
  }

  get errors(): InstaErrorDto[] {
    if (this._errors !== undefined) {
      return this._errors
    } else {
      throw new Error("Insta errors collection is not loaded, please update it first")
    }
  }

  async internalFetchPosts() {
    // Remove deleted posts from fetching
    this._inProgress = this._inProgress.filter(post => this._posts?.find(pst => pst.id === post.id) !== undefined)

    for (const post of this._inProgress){
      await post.update()
    }

    this._inProgress = this._inProgress.filter(post => post.status == PostStatus.Generation)

    if (this._inProgress.length > 0) {
      this._fetchTimeout = setTimeout(async () => await this.internalFetchPosts(), 10000)
    } else {
      clearTimeout(this._fetchTimeout)
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

    this._accounts = []
    const accounts = (await response!.json() as {instaAccounts: InstaCutAccountDto[]}).instaAccounts
    this._accounts = accounts.map(acc => new InstaAccountImpl(this.context, acc))

    const errorsResponse = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta/errors")
      .searchParam("organizationId", this.organization.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(errorsResponse)) {
      await ResponseUtils.throwError(
        `Insta errors list for organization ${this.organization.id} failed`,
        errorsResponse
      )
    }

    this._errors = []
    this._errors = (await errorsResponse!.json() as {errors: InstaErrorDto[]}).errors

    const postsResponse = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta/post/list")
      .searchParam("organizationId", this.organization.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(postsResponse)) {
      await ResponseUtils.throwError(
        `Insta posts list for organization ${this.organization.id} failed`,
        postsResponse
      )
    }

    this._posts = []
    const posts = (await postsResponse!.json() as {posts: InstaPostDto[]}).posts
    this._posts = posts.map(post => new InstaPostImpl(this.context, post))

    this._inProgress = []
    clearTimeout(this._fetchTimeout)

    this._inProgress = this._posts.filter(post => post.status == PostStatus.Generation)

    if (this._inProgress.length > 0) {
      this._fetchTimeout = setTimeout(async () => await this.internalFetchPosts(), 10000)
    }
  }

  async add( 
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
    videoEditingSetting?: InstaVideoEditingSetting): Promise<void> {
    if (username === undefined || username === null || username.trim() === "") {
      throw new Error("Add insta account, username can not be null or empty")
    }
    if (password === undefined || password === null || password.trim() === "") {
      throw new Error("Add insta account, password can not be null or empty")
    }
    if (twoFactorKey === undefined || twoFactorKey === null || twoFactorKey.trim() === "") {
      throw new Error("Add insta account, twoFactorKey can not be null or empty")
    }
    if (proxy === undefined || proxy === null) {
      throw new Error("Add insta account, proxy can not be null")
    }
    if (additionalContext === undefined || additionalContext === null) {
      throw new Error("Add insta account, additionalContext can not be null")
    }
    if (conversationContext === undefined || conversationContext === null) {
      throw new Error("Add insta account, conversationContext can not be null")
    }
    if (folderId === undefined || folderId === null) {
      throw new Error("Add insta account, folderId can not be null")
    }
    if (postCron === undefined || postCron === null) {
      throw new Error("Add insta account, postCron can not be null")
    }
    if (postTimezone === undefined || postTimezone === null) {
      throw new Error("Add insta account, postTimezone can not be null")
    }
    if (directCron === undefined || directCron === null) {
      throw new Error("Add insta account, directCron can not be null")
    }
    if (directTimezone === undefined || directTimezone === null) {
      throw new Error("Add insta account, directTimezone can not be null")
    }
    if (videoEditingSetting !== undefined) {
      if (videoEditingSetting.minSpeedChange === undefined || videoEditingSetting.minSpeedChange === null) {
        throw new Error("Add insta account, videoEditingSetting.minSpeedChange can not be null")
      }
      if (videoEditingSetting.maxSpeedChange === undefined || videoEditingSetting.maxSpeedChange === null) {
        throw new Error("Add insta account, videoEditingSetting.maxSpeedChange can not be null")
      }
      if (videoEditingSetting.minSpeedChange > videoEditingSetting.maxSpeedChange) {
        throw new Error("Add insta account, videoEditingSetting.minSpeedChange can not be greater than maxSpeedChange")
      }
    }

    // send create request to the server
    const form = new FormData()
    form.append("organizationId", this.organization.id)
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

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta")
      .sendPostFormData(form)

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to add insta account in organization ${this.organization.id}`, response)
    }

    await this.update()

  }


  async delete(id: string): Promise<void> {
    const account = this._accounts?.find(acc => acc.id === id)

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

  async post(): Promise<void> {

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta/post")
      .sendPostJson({
        organizationId: this.organization.id
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to add post for insta accounts in organization ${this.organization.id}`, response)
    }


    await this.update()
  }

  async deletePost(id: string): Promise<void> {
    const post = this._posts?.find(acc => acc.id === id)

    // check if account is found
    if (!post) {
      throw new Error(`Insta post ${id} is not found, organization: ${this.organization.id}`)
    }

    // send delete request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta/post")
      .searchParam("postId", id)
      .sendDelete()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed to delete insta post: ${id}, organization: ${this.organization.id}`,
        response
      )
    }

    await this.update()
  }

  async deleteError(id: string): Promise<void> {
    const error = this._errors?.find(err => err.id === id)

    // check if account is found
    if (!error) {
      throw new Error(`Insta error ${id} is not found, organization: ${this.organization.id}`)
    }

    // send delete request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta/error")
      .searchParam("errorId", id)
      .sendDelete()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed to delete insta error: ${id}, organization: ${this.organization.id}`,
        response
      )
    }

    await this.update()
  }



}
