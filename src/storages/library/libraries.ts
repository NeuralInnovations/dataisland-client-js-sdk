import { Library } from "./library"
import { OrganizationId } from "../organizations/organizations"
import { LibraryDto } from "../../dto/libraryResponse"
import { LibraryId } from "./libraryId"

/**
 * Library management, you must have permissions to manage libraries
 */
export abstract class LibraryManagement {
  /**
   * Create a new library
   */
  abstract createLibrary(name: string, region: number, isPublic: boolean): Promise<LibraryId>

  /**
   * Add permission for an organization to share its data through the library
   */
  abstract addOrgToLibrary(libraryId: LibraryId, organizationId: OrganizationId): Promise<void>

  /**
   * Get all libraries
   */
  abstract getLibraries(): Promise<LibraryDto[]>

  /**
   * Delete permission for an organization to share its data through the library
   */
  abstract deleteOrgFromLibrary(libraryId: LibraryId, organizationId: OrganizationId): Promise<void>

  /**
   * Delete a library by id
   */
  abstract deleteLibrary(libraryId: LibraryId): Promise<void>
}

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

  /**
   * You must have permissions to manage libraries
   */
  abstract get management(): LibraryManagement
}
