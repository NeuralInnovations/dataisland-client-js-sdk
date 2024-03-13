import { type Constructor, type Registry } from "./internal/registry"
import { type Lifetime } from "./disposable"
import { Command, CommandService } from "./services/commandService"
import { DataIslandApp } from "./dataIslandApp"

/**
 * DataIsland App context.
 */
export class Context {
  constructor(
    private readonly registry: Registry,
    public readonly lifetime: Lifetime,
    public readonly app: DataIslandApp
  ) {
  }

  /**
   * Resolve a service from the context.
   * @param type of the service
   */
  resolve<T>(type: Constructor<T>): T | undefined {
    return this.registry.get(type)
  }

  /**
   * Execute a command.
   * @param command to execute
   */
  async execute<T extends Command>(command: T): Promise<void> {
    const service = this.resolve(CommandService) as CommandService
    await service.execute(command)
  }
}
