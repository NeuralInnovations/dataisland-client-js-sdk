import {Context} from "../../context"
import {Disposable} from "../../disposable"
import {
  FileDto, FileProcessingStage,
  FileProgressDto,
  MetadataDto
} from "../../dto/workspacesResponse"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import {File} from "./file"
import {FilesEvent} from "./files"

export class FileImpl extends File implements Disposable {
  private _isDisposed: boolean = false
  private _content?: FileDto
  private _progress?: FileProgressDto

  constructor(private readonly context: Context) {
    super()
  }

  async initFrom(file: FileDto): Promise<File> {
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

  get description(): string {
    return <string>this._content?.description
  }

  get metadata(): MetadataDto[] {
    const metadataString = <string>this._content?.fileMetadata
    if (metadataString === null || metadataString === undefined){
      return []
    }
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

  get status(): FileProcessingStage {
    return <FileProcessingStage>this._content?.stage
  }

  get progress(): FileProgressDto | undefined {
    return this._progress
  }

  updateStatus(progress: FileProgressDto): void {
    if (this._content){
      this._progress = progress
      this._content.stage = this._progress.stage

      this.dispatch({
        type: FilesEvent.UPDATED,
        data: this
      })
    }
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
