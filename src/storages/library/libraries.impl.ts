import { Libraries } from "./libraries"
import { Library } from "./library"
import { LibraryImpl } from "./library.impl"
import { Context } from "../../context"
import { LibrariesResponse } from "../../dto/libraryResponse"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import { LibraryId } from "./libraryId"

export class LibrariesImpl extends Libraries {
  private readonly _libraries: LibraryImpl[] = []

  constructor(
    private readonly context: Context
  ) {
    super()
  }

  async initialize() {
    // fetch limits
    const response = await this.context.resolve(RpcService)
      ?.requestBuilder("api/v1/libraries")
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to get libraries", response)
    }

    const json = await response!.json()

    // parse limits from the server's response
    const libraries = (json as LibrariesResponse).libraries

    this._libraries.length = 0
    for (const library of libraries) {
      const impl = new LibraryImpl(this.context)
      await impl.initFrom(library)
      this._libraries.push(impl)
    }
  }

  get collection(): readonly Library[] {
    return this._libraries
  }

  getLibraryById(libraryId: LibraryId): Library | undefined {
    return this._libraries.find((library) => library.id === libraryId)
  }

}
