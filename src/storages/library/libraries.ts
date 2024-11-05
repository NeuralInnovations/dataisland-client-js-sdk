import { Library } from "./library"
import { LibraryId } from "./libraryId"

/**
 * Libraries
 */
export abstract class Libraries {

  /**
   * Collection of libraries
   */
  abstract get collection(): ReadonlyArray<Library>

  /**
   * Get library by id
   * @param libraryId
   */
  abstract getLibraryById(libraryId: LibraryId): Library | undefined
}
