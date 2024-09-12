import { LibraryPage } from "./libraryPage"
import { FolderId } from "./folderId"
import { LibraryId } from "./libraryId"

export abstract class LibraryFolder {

  abstract get libraryId(): LibraryId

  abstract get folderId(): FolderId

  abstract get name(): string

  abstract get description(): string

  abstract get iconId(): string

  abstract itemsCount(): Promise<number>

  /**
   * Query files.
   */
  abstract query(query: string, page: number, limit: number): Promise<LibraryPage>
}
