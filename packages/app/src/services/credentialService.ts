import { type CredentialBase } from '../credentials'
import { Service } from './service'

export class CredentialService extends Service {
  use(credential: CredentialBase): void {
    // Do nothing.
  }
}
