
import {Library, LibraryId} from "./library"
import {OrganizationId} from "../organizations/organizations"
import {LibraryDto} from "../../dto/libraryResponse"


export abstract class Libraries {

  abstract get collection(): ReadonlyArray<Library>

  abstract createLibrary(name: string, region: number, isPublic: boolean): Promise<LibraryId>

  abstract addOrgToLibrary(libraryId: LibraryId, organizationId: OrganizationId): Promise<void>

  abstract getLibraries(): Promise<LibraryDto[]>

  abstract deleteOrgFromLibrary(libraryId: LibraryId, organizationId: OrganizationId): Promise<void>

  abstract deleteLibrary(libraryId: LibraryId): Promise<void>
}
