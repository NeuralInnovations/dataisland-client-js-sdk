import { File } from "./file"

/**
 * Files page.
 */
export abstract class FilesPage {

  /**
   * Get files.
   */
  abstract get files(): File[]

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

  /**
   * Equals.
   * @param other
   */
  abstract equals(other?: FilesPage | null): boolean
}
