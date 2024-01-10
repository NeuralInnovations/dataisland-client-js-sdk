import { type MiddlewareService } from './services/middlewareService'
import { type Lifetime } from './disposable'

/**
 * DataIsland App credential.
 */
export abstract class CredentialBase {
  abstract onRegister(lifetime: Lifetime, service: MiddlewareService): void
}

export class DefaultCredential extends CredentialBase {
  onRegister(lifetime: Lifetime, service: MiddlewareService): void {
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

  onRegister(lifetime: Lifetime, service: MiddlewareService): void {
    lifetime.add(
      service.useMiddleware(async (req, next) => {
        req.headers.set('Authorization', `Basic ${this.email}:${this.password}`)
        await next(req)
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

  onRegister(lifetime: Lifetime, service: MiddlewareService): void {
    lifetime.add(
      service.useMiddleware(async (req, next) => {
        req.headers.set('Authorization', `Bearer ${this.token}`)
        await next(req)
      })
    )
  }
}
