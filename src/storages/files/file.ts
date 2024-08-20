import {
  FileProcessingStage,
  FileProgressDto,
  MetadataDto
} from "../../dto/workspacesResponse"
import { EventDispatcher } from "../../events"
import { FilesEvent } from "./files"

export type FileId = string

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
   * File description.
   */
  abstract get description(): string

  /**
   * File metadata.
   */
  abstract get metadata(): MetadataDto[]

  /**
   * File date added.
   */
  abstract get createdAt(): number

  /**
   * File date modified.
   */
  abstract get modifiedAt(): number

  /**
   * File uploading progress
   */
  abstract get progress(): FileProgressDto | undefined

  /**
   * File uploading status
   */
  abstract get status(): FileProcessingStage

  /**
   * Get temporary url.
   */
  abstract get url(): string

  /**
   * Get temporary url.
   */
  abstract get previewUrl(): string

  /**
   * Update file.
   */
  abstract update(name: string, metadata: MetadataDto[], description?: string): Promise<void>

  /**
   * Update file status
   * @param progress
   */
  abstract updateStatus(progress: FileProgressDto): void
}
