import { Context } from "../../context"
import { Disposable } from "../../disposable"
import { FileDto, FileProgressDto } from "../../dto/workspacesResponse"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import { File } from "./file"

export class FileImpl extends File implements Disposable {
  private _isDisposed: boolean = false
  private _content?: FileDto

  constructor(private readonly context: Context) {
    super()
  }

  public initFrom(file: FileDto): File {
    this._content = file

    return this
  }

  get isDisposed(): boolean {
    return this._isDisposed
  }

  dispose(): void {
    this._isDisposed = true
  }

  get id(): string {
    return <string>this._content?.id
  }

  get name(): string {
    return <string>this._content?.name
  }

  async url(): Promise<string> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Files/url")
      .searchParam("id", this.id)
      .sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed to get file ${this.id} url`,
        response
      )
    }

    return (await response!.json()).url
  }

  async status(): Promise<FileProgressDto> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Files/fetch")
      .searchParam("id", this.id)
      .sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get file ${this.id}`, response)
    }

    const content = await response!.json()
    return content.progress as FileProgressDto
  }
}
