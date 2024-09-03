import { LibraryPage } from "./libraryPage"
import { LibraryFolder, FolderId } from "./libraryFolder"

export type LibraryId = string

/**
 * Library.
 */
export abstract class Library {

  /**
   * Library id.
   */
  abstract get id(): LibraryId

  /**
   * Library name.
   */
  abstract get name(): string

  /**
   * Get library folder by id.
   */
  abstract getFolder(folderId: FolderId): Promise<LibraryFolder>

  /**
   * Get library folders by query.
   */
  abstract query(query: string, page: number, limit: number): Promise<LibraryPage>
}
