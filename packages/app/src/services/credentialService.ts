import { type CredentialBase } from '../credentials'
import { Service } from './service'
import { type DisposableContainer } from '../disposable'
import { MiddlewareService } from './middlewareService'

export class CredentialService extends Service {
  private _credentialDispose?: DisposableContainer = undefined
  private _credential?: CredentialBase = undefined

  public get credential(): CredentialBase | undefined {
    return this._credential
  }

  useCredential(credential: CredentialBase): void {
    if (credential !== this._credential) {
      if (this._credentialDispose !== undefined) {
        this._credentialDispose.dispose()
      }
      this._credentialDispose = this.lifetime.defineNested()
      this._credential = credential

      const middlewareService = this.resolve(MiddlewareService)
      if (middlewareService !== undefined) {
        credential.onRegister(
          this._credentialDispose.lifetime,
          middlewareService
        )
      } else {
        throw new Error(
          'Cannot use credential without middleware service. Did you forget to register the middleware service?'
        )
      }
    }
  }
}
