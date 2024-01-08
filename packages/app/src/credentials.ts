import { type AppBuilder } from './appBuilder'

/**
 * DataIsland App credential.
 */
export abstract class CredentialBase {
  abstract use(builder: AppBuilder): void
}

export class DefaultCredential extends CredentialBase {
  use(builder: AppBuilder): void {
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

  use(builder: AppBuilder): void {
    builder.addMiddleware(async (req, next) => {
      req.headers.set('Authorization', `Basic ${this.email}:${this.password}`)
      await next()
    })
  }
}

export class BearerCredential extends CredentialBase {
  readonly token: string

  constructor(token: string) {
    super()
    this.token = token
  }

  use(builder: AppBuilder): void {
    builder.addMiddleware(async (req, next) => {
      req.headers.set('Authorization', `Bearer ${this.token}`)
      await next()
    })
  }
}
