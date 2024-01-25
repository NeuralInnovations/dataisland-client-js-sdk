import { FileProgressDto } from '../dto/workspacesResponse'
import { EventDispatcher } from '../events'

export type FileId = string

export enum FilesEvent {
  ADDED = 'added',
  REMOVED = 'removed'
}

export type UploadFile = globalThis.File

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

/**
 * Files storage.
 */
export abstract class Files extends EventDispatcher<FilesEvent, File> {
  /**
   * Get file by id.
   */
  abstract upload(file: UploadFile): Promise<File>

  /**
   * Delete file.
   * @param id
   */
  abstract delete(id: FileId): Promise<void>

  /**
   * Query files.
   */
  abstract query(query: string, page: number, limit: number): Promise<FilesPage>
}

export abstract class FilesPage {
  abstract get files(): File[]

  abstract get pages(): number

  abstract get total(): number

  abstract get page(): number
}
