import { type Context } from '../context'
import { type Constructor } from '../internal/registry'
import { type DisposableContainer, type Lifetime } from '../disposable'

export class ServiceContext {
  constructor(
    public readonly context: Context,
    private readonly disposableContainer: DisposableContainer
  ) {}

  public get lifetime(): Lifetime {
    return this.disposableContainer.lifetime
  }

  resolve<T>(type: Constructor<T>): T | undefined {
    return this.context.resolve(type)
  }

  public async onRegister(): Promise<void> {
    await Promise.resolve()
  }

  public async onStart(): Promise<void> {
    await Promise.resolve()
  }

  public onUnregister(): void {
    // do nothing
  }
}

export abstract class Service {
  public resolve<T>(type: Constructor<T>): T | undefined {
    return this.serviceContext.resolve(type)
  }

  public get lifetime(): Lifetime {
    return this.serviceContext.lifetime
  }

  public get context(): Context {
    return this.serviceContext.context
  }

  public constructor(private readonly serviceContext: ServiceContext) {}
}
