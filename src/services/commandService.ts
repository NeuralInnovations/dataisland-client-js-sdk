import { Service } from "./service"
import { Context } from "../context"
import { Constructor } from "../internal/registry"

export abstract class CommandHandler<T> {
  constructor(protected readonly context: Context) {
  }

  resolve<T>(type: Constructor<T>): T | undefined {
    return this.context.resolve<T>(type)
  }

  abstract execute(message: T): Promise<void>
}

export abstract class Command {
}

export class CommandService extends Service {
  private readonly _registry: Map<
    Constructor<any>,
    (context: Context) => CommandHandler<any>
  > = new Map()
  private _lastPromise: Promise<void> = Promise.resolve()

  register<T extends Command>(
    messageType: Constructor<T>,
    commandFactory: (context: Context) => CommandHandler<T>
  ): void {
    this._registry.set(messageType, commandFactory)
  }

  async execute<T extends Command>(message: T): Promise<void> {
    const commandFactory = this._registry.get((message as any).constructor)
    if (commandFactory) {
      const command = commandFactory(this.context)
      await this._lastPromise
      this._lastPromise = command.execute(message)
      await this._lastPromise
    } else {
      throw new Error(
        `Command not found for message type ${message.constructor.name}`
      )
    }
  }
}
