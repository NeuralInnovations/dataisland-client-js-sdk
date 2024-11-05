import { LibraryAdministration } from "./library.administration"
import { StatisticAdministration } from "./statistics.administration"

export abstract class Administration {
  abstract get libraries(): LibraryAdministration ;

  abstract get statistic(): StatisticAdministration;
}
