import { EventDispatcher } from '../events'

export type FileId = string

export enum FilesEvent {
  ADDED = 'added',
  REMOVED = 'removed'
}

export enum FileStatus {
  READY = 'ready',
  PROCESSING = 'processing',
  ERROR = 'error'
}

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
  abstract get status(): FileStatus
}

/**
 * Files storage.
 */
export abstract class Files extends EventDispatcher<FilesEvent, File> {
  /**
   * Files count.
   */
  abstract get total(): number

  /**
   * Get file by id.
   */
  abstract upload(path: string, name: string): Promise<File>

  /**
   * Delete file.
   * @param id
   */
  abstract delete(id: FileId): Promise<void>

  /**
   * Query files.
   */
  abstract query(path: string, page: number, limit: number): Promise<File[]>
}
