import { Context } from "../../context"
import { Disposable } from "../../disposable"
import { FileDto, FileProgressDto } from "../../dto/workspacesResponse"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import { File } from "./file"
import { FilesEvent } from "./files"

export class FileImpl extends File implements Disposable {
  private _isDisposed: boolean = false
  private _content?: FileDto
  private _status?: FileProgressDto


  constructor(private readonly context: Context) {
    super()
  }

  async initFrom(file: FileDto): Promise<File> {
    this._content = file

    await this.updateStatus()

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

  get createdAt(): number {
    return <number>this._content?.createdAt
  }

  get status(): FileProgressDto {
    return <FileProgressDto>this._status
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

  public fetchAfter() {
    if (this._status === undefined || this._status.success === null ||
      (this._status.success && this._status.completed_parts_count !== this.status.file_parts_count)) {
      setTimeout(async () => await this.updateStatus(), 1000)
    }
  }

  async updateStatus(): Promise<void> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Files/fetch")
      .searchParam("id", this.id)
      .sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get file ${this.id}`, response)
    }

    const new_status = (await response!.json()).progress as FileProgressDto

    if (this._status !== undefined && new_status.success !== null &&
      (new_status.completed_parts_count > this._status?.completed_parts_count || !new_status.success)){
      // dispatch event, file updated
      this.dispatch({
        type: FilesEvent.UPDATED,
        data: this
      })
    }

    this._status = new_status

    this.fetchAfter()
  }
}
