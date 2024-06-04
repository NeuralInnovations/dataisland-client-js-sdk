import { EventDispatcher } from "../../events"
import { File, FileId } from "./file"
import { FilesPage } from "./filesPage"

/**
 * Files event.
 */
export enum FilesEvent {
  ADDED = "added",
  REMOVED = "removed",
  UPDATED = "updated"
}

/**
 * Upload file.
 */
export type UploadFile = globalThis.File

/**
 * Files storage.
 */
export abstract class Files extends EventDispatcher<FilesEvent, File> {
  /**
   * Upload file.
   */
  abstract upload(files: UploadFile[], metadata: Map<string, string>): Promise<File[]>

  /**
   * Get file by ID
   * @param fileId 
   */
  abstract get(fileId: FileId): Promise<File>

  /**
   * Delete files.
   * @param ids
   */
  abstract delete(ids: FileId[]): Promise<void>

  /**
   * Query files.
   */
  abstract query(query: string, page: number, limit: number): Promise<FilesPage>
}

