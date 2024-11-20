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
import {
  UsersAdministrationImpl
} from "../storages/administration/users.administration.impl"
import {
  CheatsAdministrationImpl
} from "../storages/administration/cheats.administration.impl"

export class AdministrationService extends Service implements Administration {
  private readonly _libraries: LibraryAdministrationImpl
  private readonly _statistic: StatisticAdministrationImpl
  private readonly _users: UsersAdministrationImpl
  private readonly _cheats: CheatsAdministrationImpl

  constructor(context: ServiceContext) {
    super(context)

    this._libraries = new LibraryAdministrationImpl(context.context)
    this._statistic = new StatisticAdministrationImpl(context.context)
    this._users = new UsersAdministrationImpl(context.context)
    this._cheats = new CheatsAdministrationImpl(context.context)
  }

  get libraries(): LibraryAdministration {
    return this._libraries
  }

  get statistic(): StatisticAdministrationImpl {
    return this._statistic
  }

  get users(): UsersAdministrationImpl {
    return this._users
  }

  get cheats(): CheatsAdministrationImpl {
    return this._cheats
  }
}
