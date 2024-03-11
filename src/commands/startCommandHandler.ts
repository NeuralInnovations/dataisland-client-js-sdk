
import { CommandHandler, Command } from "../services/commandService"
import { UserProfileService } from "../services/userProfileService"
import { getCookie, setCookie } from "../utils/browserUtils"


export class StartCommand extends Command {}

export class StartCommandHandler extends CommandHandler<StartCommand> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(message: StartCommand): Promise<void> {
    const user_service = this.context.resolve(
      UserProfileService
    ) as UserProfileService
    const anonymous_token = getCookie("anonymous-token")
    if (anonymous_token !== null && anonymous_token.length > 0){
      await user_service.merge(anonymous_token)
      setCookie("anonymous-token", "")
    }else{
      await user_service.fetch()
    }
  }

  
}
