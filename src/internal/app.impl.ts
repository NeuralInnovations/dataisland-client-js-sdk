import { DEFAULT_HOST } from '../index'
import { type AppBuilder } from '../appBuilder'
import { AppBuilderImplementation } from './appBuilder.impl'
import { type Constructor, Registry } from './registry'
import { Context } from '../context'
import { DisposableContainer, type Lifetime } from '../disposable'
import { type Service, ServiceContext } from '../services/service'
import { CredentialService } from '../services/credentialService'
import { MiddlewareService } from '../services/middlewareService'
import { type CredentialBase } from '../credentials'
import { AppSdk } from '../appSdk'
import { RpcService } from '../services/rpcService'
import { CommandService } from '../services/commandService'
import {
  StartCommandHandler,
  StartCommand
} from '../commands/startCommandHandler'
import { UserProfileService } from '../services/userProfileService'
import { OrganizationService } from '../services/organizationService'
import { Organizations } from '../storages/organizations'
import { UserProfile } from '../storages/userProfile'
import { isUnitTest, UnitTest } from '../unitTest'

export class AppImplementation extends AppSdk {
  readonly name: string
  private _host: string = DEFAULT_HOST
  private _automaticDataCollectionEnabled: boolean = true
  private readonly _registry: Registry
  private readonly _context: Context
  private readonly _disposable: DisposableContainer

  constructor(name: string) {
    super()
    this.name = name
    this._registry = new Registry()
    this._disposable = new DisposableContainer()
    this._context = new Context(this._registry, this._disposable.lifetime)

    this._registry.map(Context).asValue(this._context)
  }

  get context(): Context {
    return this._context
  }

  get credential(): CredentialBase | undefined {
    return this.resolve<CredentialService>(CredentialService)?.credential
  }

  set credential(value: CredentialBase) {
    this.resolve(CredentialService)?.useCredential(value)
  }

  get lifetime(): Lifetime {
    return this._disposable.lifetime
  }

  resolve = <T>(type: Constructor<T>): T | undefined => this._registry.get(type)

  get automaticDataCollectionEnabled(): boolean {
    return this._automaticDataCollectionEnabled
  }

  get host(): string {
    return this._host
  }

  get organizations(): Organizations {
    return this.resolve(OrganizationService)?.organizations as Organizations
  }

  get userProfile(): UserProfile {
    return this.resolve(UserProfileService)?.userProfile as UserProfile
  }

  async initialize(
    setup: ((builder: AppBuilder) => Promise<void>) | undefined
  ): Promise<void> {
    // create app builder
    const builder = new AppBuilderImplementation()

    // register commands
    builder.registerCommand(StartCommand, (context: Context) => {
      return new StartCommandHandler(context)
    })

    // register services
    builder.registerService(CredentialService, (context: ServiceContext) => {
      return new CredentialService(context)
    })
    builder.registerService(MiddlewareService, (context: ServiceContext) => {
      return new MiddlewareService(context)
    })
    builder.registerService(RpcService, (context: ServiceContext) => {
      return new RpcService(context, builder.host)
    })
    builder.registerService(CommandService, (context: ServiceContext) => {
      return new CommandService(context)
    })
    builder.registerService(UserProfileService, (context: ServiceContext) => {
      return new UserProfileService(context)
    })
    builder.registerService(OrganizationService, (context: ServiceContext) => {
      return new OrganizationService(context)
    })

    // register middlewares
    builder.registerMiddleware(async (req, next) => {
      req.headers.set('accept', 'text/plain')
      await next(req)
    })

    // call customer setup
    if (setup !== undefined) {
      await setup(builder)
    }

    // host
    this._host = builder.host

    // automaticDataCollectionEnabled
    this._automaticDataCollectionEnabled =
      builder.automaticDataCollectionEnabled

    // register services
    const services: Array<[ServiceContext, Service]> = []
    builder.services.forEach(serviceFactory => {
      const serviceContext = new ServiceContext(
        this._context,
        this._disposable.defineNested()
      )
      serviceContext.lifetime.addCallback(() => {
        serviceContext.onUnregister()
      }, serviceContext)
      const serviceInstance = serviceFactory[1](serviceContext)
      services.push([serviceContext, serviceInstance])
      this._registry.map(serviceFactory[0]).asValue(serviceInstance)
    })

    builder.middlewares.forEach(middleware => {
      this.resolve(MiddlewareService)?.useMiddleware(middleware)
    })

    builder.commands.forEach(command => {
      this.resolve(CommandService)?.register(command[0], command[1])
    })

    this.credential = builder.credential

    //-------------------------------------------------------------------------
    // register services
    //-------------------------------------------------------------------------
    const waitList: Array<Promise<void>> = []
    // call onRegister service's callback
    services.forEach(([serviceContext]) => {
      waitList.push(serviceContext.onRegister())
    })

    // wait for all services to register
    await Promise.all(waitList)
    //-------------------------------------------------------------------------

    //-------------------------------------------------------------------------
    // start services
    //-------------------------------------------------------------------------
    waitList.length = 0
    // call onStart service's callback
    services.forEach(([serviceContext]) => {
      waitList.push(serviceContext.onStart())
    })

    // wait for all services to start
    await Promise.all(waitList)
    //-------------------------------------------------------------------------

    // start app, execute start command
    if (!isUnitTest(UnitTest.DO_NOT_START)) {
      await this.context.execute(new StartCommand())
    }

    // log app initialized
    if (!isUnitTest(UnitTest.DO_NOT_PRINT_INITIALIZED_LOG)) {
      console.log(`AppSDK ${this.name} initialized`)
    }
  }
}
