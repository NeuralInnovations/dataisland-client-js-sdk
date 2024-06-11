import {Context} from "../../context"
import {Disposable} from "../../disposable"
import {
  FileDto,
  FileProgressDto,
  MetadataDto
} from "../../dto/workspacesResponse"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import {File, FileStatus} from "./file"
import {FilesEvent} from "./files"
import {isNullOrUndefined} from "../../utils/utils"

export class FileImpl extends File implements Disposable {
  private _isDisposed: boolean = false
  private _content?: FileDto
  private _progress?: FileProgressDto

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

  get description(): string {
    return <string>this._content?.description
  }

  get metadata(): MetadataDto[] {
    const metadataString = <string>this._content?.fileMetadata
    return <MetadataDto[]>JSON.parse(metadataString)
  }

  get createdAt(): number {
    return <number>this._content?.createdAt
  }

  get modifiedAt(): number {
    return <number>this._content?.modifiedAt
  }
  
  get url(): string {
    return <string>this._content?.url
  }

  get previewUrl(): string {
    return <string>this._content?.previewUrl
  }

  get progress(): FileProgressDto {
    return <FileProgressDto>this._progress
  }

  get status(): FileStatus {

    if (
      isNullOrUndefined(this._progress) || isNullOrUndefined(this._progress.success)
      || (this._progress.success && this._progress.completed_parts_count < this._progress.file_parts_count)) {
      return FileStatus.UPLOADING
    } else if (this._progress.success) {
      return FileStatus.SUCCESS
    } else {
      return FileStatus.FAILED
    }
  }

  public fetchAfter() {
    if (this.status === FileStatus.UPLOADING) {
      setTimeout(async () => await this.updateStatus(), 500)
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

    const prev_progress = this._progress
    this._progress = (await response!.json() as {
      progress: FileProgressDto
    }).progress as FileProgressDto

    if (isNullOrUndefined(prev_progress) ||
      (!isNullOrUndefined(this.progress.success) && this.progress.completed_parts_count > prev_progress.completed_parts_count) ||
      this.status === FileStatus.SUCCESS ||
      this.status === FileStatus.FAILED) {
      // dispatch event, file updated
      this.dispatch({
        type: FilesEvent.UPDATED,
        data: this
      })
    }

    this.fetchAfter()
  }

  async update(name: string, metadata: MetadataDto[], description?: string){
    if (!this._content) {
      throw new Error("File is not loaded.")
    }

    if (name === undefined || metadata === undefined || name === null || metadata === null ){
      throw new Error("File update, one of parameters is undefined or null")
    }

    const metadataString = JSON.stringify(metadata)

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Files")
      .sendPutJson({
        fileId: this.id,
        name: name,
        description: description ?? this.description,
        metadata: metadataString
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to update file", response)
    }

    this._content = (await response!.json() as {
      file: FileDto
    }).file as FileDto

    this.dispatch({
      type: FilesEvent.UPDATED,
      data: this
    })
  }
}
