import { CommandHandler, Command } from "../services/commandService"
import { UserProfileService } from "../services/userProfileService"
import { CookieService } from "../services/cookieService"
import { AnonymousCredential } from "../credentials"
import { AcquiringService } from "../services/acquiringService"
import {LibrariesService} from "../services/librariesService"

export class StartCommand extends Command {
}

export class StartCommandHandler extends CommandHandler<StartCommand> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(message: StartCommand): Promise<void> {
    const userService = this.resolve(UserProfileService)!
    const acquiringService = this.resolve(AcquiringService)!
    const librariesService = this.resolve(LibrariesService)!

    // Merge anonymous user if needed
    if (!(this.context.app.credential instanceof AnonymousCredential)) {
      const cookie = this.resolve(CookieService)!
      if (cookie.anonymousTokenIsValid) {
        await userService.merge(cookie.anonymousToken!)
        cookie.anonymousToken = undefined
      }
    }

    await userService.fetch()
    await acquiringService.initialize()
    await librariesService.initialize()
  }
}
