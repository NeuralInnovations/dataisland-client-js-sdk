import { CommandHandler, Command } from "../services/commandService"
import { UserProfileService } from "../services/userProfileService"

export class StartCommand extends Command {

  additional_arguments: Map<string, any> = new Map()

  constructor(additional_arguments: Map<string, any>){
    super()
    this.additional_arguments = additional_arguments
  }
}

export class StartCommandHandler extends CommandHandler<StartCommand> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(message: StartCommand): Promise<void> {
    const service = this.context.resolve(
      UserProfileService
    ) as UserProfileService
    const anonymous_token = message.additional_arguments.get("anonymous_token")
    if (anonymous_token !== undefined){
      await service.merge(anonymous_token)
    }else{
      await service.fetch()
    }
  }
}
