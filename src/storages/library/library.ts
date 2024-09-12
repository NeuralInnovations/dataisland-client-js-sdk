import { LibraryPage } from "./libraryPage"
import { LibraryFolder } from "./libraryFolder"
import { FolderId } from "./folderId"
import { LibraryId } from "./libraryId"

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

  /**
   * Get library folders by query.
   */
  abstract query(query: string, page: number, limit: number, folderId: FolderId): Promise<LibraryPage>
}
