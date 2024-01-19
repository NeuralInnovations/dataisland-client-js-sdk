import { AppBuilder } from '../appBuilder'
import { DEFAULT_HOST } from '../index'
import { type CredentialBase, DefaultCredential } from '../credentials'
import type { Middleware } from '../middleware'
import { type Service, type ServiceContext } from '../services/service'
import { type Constructor } from './registry'
import { Command, CommandHandler } from '../services/commandService'
import { Context } from '../context'

export class AppBuilderImplementation extends AppBuilder {
  host: string = DEFAULT_HOST
  automaticDataCollectionEnabled: boolean = true
  credential: CredentialBase = new DefaultCredential()
  middlewares: Middleware[] = []
  services: Array<[Constructor<any>, (context: ServiceContext) => Service]> = []
  commands: Array<
    [Constructor<any>, (context: Context) => CommandHandler<any>]
  > = []

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

  registerService<T extends Service>(
    type: Constructor<T>,
    factory: (context: ServiceContext) => T
  ): AppBuilder {
    if (type === undefined || type === null) {
      throw new Error('registerService, type is undefined|null')
    }
    if (factory === undefined || factory === null) {
      throw new Error('registerService, factory is undefined|null')
    }
    this.services.push([type, factory])
    return this
  }

  registerCommand<T extends Command>(
    messageType: Constructor<T>,
    commandFactory: (context: Context) => CommandHandler<T>
  ): AppBuilder {
    if (messageType === undefined || messageType === null) {
      throw new Error('registerCommand, messageType is undefined|null')
    }
    if (commandFactory === undefined || commandFactory === null) {
      throw new Error('registerCommand, commandFactory is undefined|null')
    }
    this.commands.push([messageType, commandFactory])
    return this
  }
}
