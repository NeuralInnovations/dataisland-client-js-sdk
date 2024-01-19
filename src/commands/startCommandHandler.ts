import { CommandHandler, Command } from '../services/commandService'

export class StartCommand extends Command {}

export class StartCommandHandler extends CommandHandler<StartCommand> {
  async execute(message: StartCommand): Promise<void> {
    console.log(
      `StartCommand executed with message ${message} and context ${this.context}`
    )
  }
}
