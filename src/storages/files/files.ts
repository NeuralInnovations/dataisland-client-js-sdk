import { EventDispatcher } from "../../events"
import { File, FileId } from "./file"
import { FilesPage } from "./filesPage"

/**
 * Files event.
 */
export enum FilesEvent {
  ADDED = "added",
  REMOVED = "removed"
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

