import { LibraryPage, LibraryParent } from "./libraryPage"
import { LibraryFolder } from "./libraryFolder"
import { File } from "../files/file"
import { FolderId } from "./folderId"

export class LibraryParentImpl extends LibraryParent {
  /**
   * Get parent id.
   */
  public id: FolderId

  /**
   * Get parent name.
   */
  public name: string

  constructor(id: FolderId, name: string) {
    super()
    this.id = id
    this.name = name
  }
}

export class LibraryPageImpl extends LibraryPage {

  public libraryId: string = ""
  public parents: LibraryParent[] = []
  public files: File[] = []
  public folders: LibraryFolder[] = []

  public total: number = 0
  public filesPerPage: number = 0
  public page: number = 0

  get pages(): number {
    return Math.ceil(Math.max(this.total / this.filesPerPage, 1.0))
  }

}
