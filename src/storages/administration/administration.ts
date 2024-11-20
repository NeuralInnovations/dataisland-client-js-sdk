import { LibraryAdministration } from "./library.administration"
import { StatisticAdministration } from "./statistics.administration"
import {UsersAdministration} from "./users.administration"
import {CheatsAdministration} from "./cheats.administration"

export abstract class Administration {
  abstract get libraries(): LibraryAdministration ;

  abstract get statistic(): StatisticAdministration;

  abstract get users(): UsersAdministration;

  abstract get cheats(): CheatsAdministration
}
