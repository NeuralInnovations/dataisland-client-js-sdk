import { Service, ServiceContext } from "./service"
import {
  LibraryAdministrationImpl
} from "../storages/administration/library.administration.impl"
import {
  LibraryAdministration
} from "../storages/administration/library.administration"
import {
  StatisticAdministrationImpl
} from "../storages/administration/statistics.administration.impl"
import { Administration } from "../storages/administration/administration"

export class AdministrationService extends Service implements Administration {
  private readonly _libraries: LibraryAdministrationImpl
  private readonly _statistic: StatisticAdministrationImpl

  constructor(context: ServiceContext) {
    super(context)

    this._libraries = new LibraryAdministrationImpl(context.context)
    this._statistic = new StatisticAdministrationImpl(context.context)
  }

  get libraries(): LibraryAdministration {
    return this._libraries
  }

  get statistic(): StatisticAdministrationImpl {
    return this._statistic
  }
}
