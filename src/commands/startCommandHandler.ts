import { CommandHandler, Command } from "../services/commandService"
import { UserProfileService } from "../services/userProfileService"

export class StartCommand extends Command {}

export class StartCommandHandler extends CommandHandler<StartCommand> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(message: StartCommand): Promise<void> {
    const service = this.context.resolve(
      UserProfileService
    ) as UserProfileService
    await service.fetch()
  }
}
