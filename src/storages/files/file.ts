import { FileProgressDto } from "../../dto/workspacesResponse"
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
   * File date added.
   */
  abstract get createdAt(): number

  /** 
   * File progress status
   */
  abstract get status(): FileProgressDto

  /**
   * Get temporary url.
   */
  abstract url(): Promise<string>

}
