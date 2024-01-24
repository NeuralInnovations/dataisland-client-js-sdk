import { Context } from "../context"
import { Disposable } from "../disposable"
import { FileDto, FileProgressDto } from "../dto/workspacesResponse"
import { RpcService } from "../services/rpcService"
import { File } from "./files"


export class FileImpl extends File implements Disposable{
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
    return <string>this._content?.id
  }

  async url(): Promise<string> {
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Files/url")
      .searchParam("id", this.id)
      .sendGet()

    if (!response?.ok) {
      throw new Error(
        `Failed to get file ${this.id} url. Status: ${response?.status},${response?.statusText}`
      )
    }

    return (await response.json())["url"]
  }

  async status(): Promise<FileProgressDto> {
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/Files/url")
      .searchParam("id", this.id)
      .sendGet()

    if (!response?.ok) {
      throw new Error(
        `Failed to get file ${this.id} status. Status: ${response?.status},${response?.statusText}`
      )
    }

    return (await response.json())["progress"] as FileProgressDto
  }

}