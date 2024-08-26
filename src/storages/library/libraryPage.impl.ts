import {LibraryPage} from "./libraryPage"
import {LibraryFolder} from "./libraryFolder"
import {File} from "../files/file"


export class LibraryPageImpl extends LibraryPage {

  public parents: string[] = []

  public files: File[] = []
  public folders: LibraryFolder[] = []

  public total: number = 0
  public filesPerPage: number = 0
  public page: number = 0


  get pages(): number {
    return Math.ceil(Math.max(this.total / this.filesPerPage, 1.0))
  }


}
