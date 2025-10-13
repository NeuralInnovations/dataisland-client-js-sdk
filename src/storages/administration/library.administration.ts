import { LibraryId } from "../library/libraryId"
import { OrganizationId } from "../organizations/organizations"
import { LibararyType, LibraryDto } from "../../dto/libraryResponse"

/**
 * Library management, you must have permissions to manage libraries
 */
export abstract class LibraryAdministration {
  /**
   * Create a new library
   */
  abstract createLibrary(
    name: string, 
    description: string, 
    region: number, 
    type: LibararyType,
    libraryUrl: string,
    remoteLibraryId: string,
    isPublic: boolean): Promise<LibraryId>

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
