import { Service, ServiceContext } from "./service"
import {LibrariesImpl} from "../storages/library/libraries.impl"
import {Libraries} from "../storages/library/libraries"

export class LibrariesService extends Service {
  private readonly _libraries: LibrariesImpl

  constructor(serviceContext: ServiceContext) {
    super(serviceContext)

    this._libraries = new LibrariesImpl(serviceContext.context)
  }

  async initialize(): Promise<void> {
    return await this._libraries.initialize()
  }

  get libraries(): Libraries {
    return this._libraries
  }

}
