import { FileProgressDto } from "../dto/workspacesResponse"

export type FileId = string

/**
 * File.
 */
export abstract class File {
  /**
   * File id.
   */
  abstract get id(): FileId

  /**
   * File name.
   */
  abstract get name(): string

  /**
   * Get temporary url.
   */
  abstract url(): Promise<string>

  /**
   * Get file status.
   */
  abstract status(): Promise<FileProgressDto>
}
