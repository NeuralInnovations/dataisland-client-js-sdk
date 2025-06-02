import {InstaPost, InstaPostId} from "./instaPost"
import {Context} from "../../context"
import {
  InstaContentDto,
  InstaPostDto,
  PostStatus
} from "../../dto/instaResponse"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"


export class InstaPostImpl extends InstaPost {
  private readonly _id: string

  private _data?: InstaPostDto

  constructor(private readonly context: Context, data: InstaPostDto) {
    super()

    this._id = data.id

    this._data = data
  }

  get id(): InstaPostId {
    return <InstaPostId>this._id
  }

  get createdAt(): number {
    if (this._data) {
      return this._data?.createdAt
    } else {
      throw new Error("Insta post data not loaded, please call update first")
    }
  }

  get status(): PostStatus {
    if (this._data) {
      return this._data?.status
    } else {
      throw new Error("Insta post data not loaded, please call update first")
    }
  }

  get content(): InstaContentDto[] {
    if (this._data) {
      return this._data?.history
    } else {
      throw new Error("Insta post data not loaded, please call update first")
    }
  }

  async update(): Promise<void> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Insta/post/status")
      .searchParam("postId", this._id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Insta post status get for post ${this._id} failes`,
        response
      )
    }

    this._data = (await response!.json() as {post: InstaPostDto}).post
  }

}
