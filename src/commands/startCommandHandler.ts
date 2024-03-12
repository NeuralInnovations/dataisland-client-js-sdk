import { CommandHandler, Command } from "../services/commandService"
import { UserProfileService } from "../services/userProfileService"
import { getCookie, setCookie } from "../utils/browserUtils"
import { CookieService } from "../services/cookieService"
import { AnonymousCredential } from "../credentials"

export class StartCommand extends Command {
}

export class StartCommandHandler extends CommandHandler<StartCommand> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(message: StartCommand): Promise<void> {
    const userService = this.resolve(UserProfileService)!

    // Merge anonymous user if needed
    if (!(this.context.app.credential instanceof AnonymousCredential)) {
      const cookie = this.resolve(CookieService)!
      if (cookie.anonymousTokenIsValid) {
        await userService.merge(cookie.anonymousToken!)
        cookie.anonymousToken = undefined
      }
    }

    await userService.fetch()
  }
}
