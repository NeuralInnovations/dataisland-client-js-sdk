import {LibraryPage} from "./libraryPage"
import {LibraryFolder, FolderId} from "./libraryFolder"

export type LibraryId = string


export abstract class Library {

  abstract get id(): LibraryId

  abstract get name(): string

  abstract getFolder(folderId: FolderId): Promise<LibraryFolder>

  abstract query(query: string, page: number, limit: number): Promise<LibraryPage>
}
