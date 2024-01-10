import { DEFAULT_HOST } from '../index'
import { type AppBuilder } from '../appBuilder'
import { AppBuilderImplementation } from './appBuilder.impl'
import { type Constructor, Registry } from './registry'
import { Context } from './context'
import { DisposableContainer, type Lifetime } from '../disposable'
import { type Service, ServiceContext } from '../services/service'
import { CredentialService } from '../services/credentialService'
import { MiddlewareService } from '../services/middlewareService'
import { type CredentialBase } from '../credentials'
import { type AppSdk } from '../appSdk'
import { RpcService, RpcServiceImpl } from '../services/rpcService'

export class AppImplementation implements AppSdk {
  readonly name: string
  private _host: string = DEFAULT_HOST
  private _automaticDataCollectionEnabled: boolean = true
  private readonly _registry: Registry
  private readonly _context: Context
  private readonly _disposable: DisposableContainer

  constructor(name: string) {
    this.name = name
    this._registry = new Registry()
    this._disposable = new DisposableContainer()
    this._context = new Context(this._registry, this._disposable.lifetime)
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

  async initialize(
    setup: ((builder: AppBuilder) => Promise<void>) | undefined
  ): Promise<void> {
    // create app builder
    const builder = new AppBuilderImplementation()

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
    builder.registerService(CredentialService, (context: ServiceContext) => {
      return new CredentialService(context)
    })
    builder.registerService(MiddlewareService, (context: ServiceContext) => {
      return new MiddlewareService(context)
    })
    builder.registerService(RpcService, (context: ServiceContext) => {
      return new RpcServiceImpl(context, builder.host) as RpcService
    })

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
      this._registry.set(serviceFactory[0], {
        provide: () => serviceInstance
      })
    })

    builder.middlewares.forEach(middleware => {
      this.resolve(MiddlewareService)?.useMiddleware(middleware)
    })

    const waitList: Array<Promise<void>> = []
    // call onRegister service's callback
    services.forEach(([serviceContext, service]) => {
      waitList.push(serviceContext.onRegister())
    })

    await Promise.all(waitList)

    waitList.length = 0
    // call onStart service's callback
    services.forEach(([serviceContext, service]) => {
      waitList.push(serviceContext.onStart())
    })

    await Promise.all(waitList)

    await Promise.resolve()
  }
}
