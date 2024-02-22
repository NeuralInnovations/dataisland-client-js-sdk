import { FilesPage } from "./filesPage"
import { Disposable } from "../../disposable"
import { File } from "./file"

export class FilesPageImpl extends FilesPage implements Disposable {
  private _isDisposed: boolean = false

  public files: File[] = []
  public total: number = 0
  public filesPerPage: number = 0
  public page: number = 0

  get pages(): number {
    return Math.ceil(Math.max(this.total / this.filesPerPage, 1.0))
  }

  get isDisposed(): boolean {
    return this._isDisposed
  }

  dispose(): void {
    this._isDisposed = true
  }

  equals(other?: FilesPage | null): boolean {
    if (other === undefined) return false
    if (other === null) return false
    if (other === this) return true
    return (
      other.pages === this.pages &&
      other.total === this.total &&
      other.page === this.page &&
      (other.files === this.files ||
        other.files.every((file, index) => file.id === this.files[index].id))
    )
  }
}
