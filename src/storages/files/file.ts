import { FileProgressDto } from "../../dto/workspacesResponse"
import { EventDispatcher } from "../../events"
import { FilesEvent } from "./files"

export type FileId = string

export enum FileStatus {
  UPLOADING = "uploading",
  SUCCESS = "success",
  FAILED = "failed"
}

/**
 * File.
 */
export abstract class File extends EventDispatcher<
  FilesEvent,
  File
> {
  /**
   * File id.
   */
  abstract get id(): FileId

  /**
   * File name.
   */
  abstract get name(): string

  /**
   * File date added.
   */
  abstract get createdAt(): number

  /**
   * File uploading progress
   */
  abstract get progress(): FileProgressDto

  /**
   * File uploading status
   */
  abstract get status(): FileStatus

  /**
   * Get temporary url.
   */
  abstract get url(): string

  /**
   * Get temporary url.
   */
  abstract get previewUrl(): string
}
