import { getCookie, removeCookie } from "typescript-cookie"
import { CommandHandler, Command } from "../services/commandService"
import { UserProfileService } from "../services/userProfileService"

export class StartCommand extends Command {}

export class StartCommandHandler extends CommandHandler<StartCommand> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(message: StartCommand): Promise<void> {
    const user_service = this.context.resolve(
      UserProfileService
    ) as UserProfileService
    const anonymous_token = getCookie("anonymous-token")
    if (anonymous_token !== undefined){
      await user_service.merge(anonymous_token)
      removeCookie("anonymous-token")
    }else{
      await user_service.fetch()
    }
  }

  
}
