import { Command, CommandHandler } from "../services/commandService"
import { RpcService } from "../services/rpcService"
import { ResponseUtils } from "../services/responseUtils"

export class DeleteUserFullCommand extends Command {

}

export class DeleteUserFullCommandHandler extends CommandHandler<DeleteUserFullCommand> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(message: DeleteUserFullCommand): Promise<void> {
    const response = await this.resolve(RpcService)?.requestBuilder("/api/v1/Users/self/full")
      .sendDelete()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to delete user", response)
    }
  }
}
