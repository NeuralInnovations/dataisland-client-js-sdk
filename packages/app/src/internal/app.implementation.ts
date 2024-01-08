import { type AppSdk, DEFAULT_HOST } from '../index'
import { type CredentialBase, DefaultCredential } from '../credentials'
import { type Middleware } from '../middleware'
import { AppBuilder } from '../appBuilder'

// class Context {}

export class AppBuilderImplementation extends AppBuilder {
  host: string = DEFAULT_HOST
  automaticDataCollectionEnabled: boolean = true
  credential: CredentialBase = new DefaultCredential()
  middlewares: Middleware[] = []

  useHost(host: string): AppBuilder {
    this.host = host ?? DEFAULT_HOST
    return this
  }

  useAutomaticDataCollectionEnabled(value: boolean): AppBuilder {
    if (value === undefined || value === null) {
      throw new Error(
        'useAutomaticDataCollectionEnabled, value is undefined|null'
      )
    }
    this.automaticDataCollectionEnabled = value
    return this
  }

  useCredential(credential: CredentialBase): AppBuilder {
    if (credential === undefined || credential === null) {
      throw new Error('useCredential, credential is undefined|null')
    }
    this.credential = credential
    return this
  }

  addMiddleware(middleware: Middleware): AppBuilder {
    if (middleware === undefined || middleware === null) {
      throw new Error('addMiddleware, middleware is undefined|null')
    }
    this.middlewares.push(middleware)
    return this
  }
}

export class AppImplementation implements AppSdk {
  readonly name: string
  private _host: string = DEFAULT_HOST
  private _automaticDataCollectionEnabled: boolean = true

  // private readonly _context: Context

  constructor(name: string) {
    this.name = name
    // this._context = new Context()
  }

  get automaticDataCollectionEnabled(): boolean {
    return this._automaticDataCollectionEnabled
  }

  get host(): string {
    return this._host
  }

  async initialize(
    setup: ((builder: AppBuilder) => Promise<void>) | undefined
  ): Promise<void> {
    const builder = new AppBuilderImplementation()
    if (setup !== undefined) {
      await setup(builder)
    }
    this._host = builder.host
    this._automaticDataCollectionEnabled =
      builder.automaticDataCollectionEnabled

    await Promise.resolve()
  }

  async auth(): Promise<void> {
    await Promise.resolve()
  }
}
