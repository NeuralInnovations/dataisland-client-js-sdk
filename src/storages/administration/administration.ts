import { LibraryAdministration } from "./library.administration"
import { StatisticAdministration } from "./statistics.administration"
import {UsersAdministration} from "./users.administration"
import {CheatsAdministration} from "./cheats.administration"
import {MaibAdministration} from "./maib.administration"
import { ChatsAdministration } from "./chats.administration"

export abstract class Administration {
  abstract get libraries(): LibraryAdministration ;

  abstract get statistic(): StatisticAdministration;

  abstract get users(): UsersAdministration;

  abstract get cheats(): CheatsAdministration

  abstract get maib(): MaibAdministration

  abstract get chats(): ChatsAdministration
}
