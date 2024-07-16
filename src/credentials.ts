import { MiddlewareService } from "./services/middlewareService"
import { type Lifetime } from "./disposable"
import { type Context } from "./context"

/**
 * DataIsland App credential.
 */
export abstract class CredentialBase {
  abstract onRegister(lifetime: Lifetime, context: Context): void
}

export class DefaultCredential extends CredentialBase {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRegister(lifetime: Lifetime, context: Context): void {
    // Do nothing.
  }
}

export class BasicCredential extends CredentialBase {
  readonly email: string
  readonly password: string

  constructor(email: string, password: string) {
    super()
    this.email = email
    this.password = password
  }

  onRegister(lifetime: Lifetime, context: Context): void {
    const service = context.resolve(MiddlewareService)
    if (service === undefined) {
      throw new Error("MiddlewareService is not registered.")
    }
    lifetime.add(
      service.useMiddleware(async (req, next) => {
        req.headers.set("Authorization", `Basic ${this.email}:${this.password}`)
        return await next(req)
      })
    )
  }
}

export class DebugCredential extends CredentialBase {
  readonly token: string

  constructor(token: string) {
    super()
    this.token = token
  }

  onRegister(lifetime: Lifetime, context: Context): void {
    const service = context.resolve(MiddlewareService)
    if (service === undefined) {
      throw new Error("MiddlewareService is not registered.")
    }
    lifetime.add(
      service.useMiddleware(async (req, next) => {
        req.headers.set("Authorization", `Debug ${this.token}`)
        return await next(req)
      })
    )
  }
}

export class BearerCredential extends CredentialBase {
  readonly token: string

  constructor(token: string) {
    super()
    this.token = token
  }

  onRegister(lifetime: Lifetime, context: Context): void {
    const service = context.resolve(MiddlewareService)
    if (service === undefined) {
      throw new Error("MiddlewareService is not registered.")
    }
    lifetime.add(
      service.useMiddleware(async (req, next) => {
        req.headers.set("Authorization", `Bearer ${this.token}`)
        return await next(req)
      })
    )
  }
}

export class AnonymousCredential extends CredentialBase {
  readonly token: string

  constructor(token: string) {
    super()
    this.token = token
  }

  onRegister(lifetime: Lifetime, context: Context): void {
    const service = context.resolve(MiddlewareService)
    if (service === undefined) {
      throw new Error("MiddlewareService is not registered.")
    }
    lifetime.add(
      service.useMiddleware(async (req, next) => {
        req.headers.set("Authorization", `InternalJWT ${this.token}`)
        return await next(req)
      })
    )
  }
}

export class CustomCredential extends CredentialBase {
  readonly schema: string
  readonly token: string

  constructor(schema: string, token: string) {
    super()
    this.token = token
    this.schema = schema
  }

  onRegister(lifetime: Lifetime, context: Context): void {
    const service = context.resolve(MiddlewareService)
    if (service === undefined) {
      throw new Error("MiddlewareService is not registered.")
    }
    lifetime.add(
      service.useMiddleware(async (req, next) => {
        req.headers.set("Authorization", `${this.schema} ${this.token}`)
        return await next(req)
      })
    )
  }
}
