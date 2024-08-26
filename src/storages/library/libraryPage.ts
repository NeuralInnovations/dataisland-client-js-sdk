import {LibraryFolder} from "./libraryFolder"
import {File} from "../files/file"


export abstract class LibraryPage {

  /**
   * Get current page.
   */
  abstract get parents(): string[]

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
