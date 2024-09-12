import { LibraryFolder } from "./libraryFolder"
import { File } from "../files/file"
import { FolderId } from "./folderId"

import { LibraryId } from "./libraryId"

export abstract class LibraryParent {
  /**
   * Get parent id.
   */
  abstract get id(): FolderId

  /**
   * Get parent name.
   */
  abstract get name(): string
}

export abstract class LibraryPage {

  /**
   * Get library id.
   */
  abstract get libraryId(): LibraryId

  /**
   * Get current page.
   */
  abstract get parents(): LibraryParent[]

  /**
   * Get page files.
   */
  abstract get files(): File[]

  /**
   * Get page folders
   */
  abstract get folders(): LibraryFolder[]

  /**
   * Get pages count.
   */
  abstract get pages(): number

  /**
   * Get total count.
   */
  abstract get total(): number

  /**
   * Get current page.
   */
  abstract get page(): number

}
