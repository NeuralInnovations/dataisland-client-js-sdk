import { Service } from "./service"
import { getCookie, setCookie } from "../utils/browserUtils"

export class CookieService extends Service {
  get anonymousToken(): string | undefined {
    return getCookie("anonymous-token")
  }

  get anonymousTokenIsValid(): boolean {
    return this.anonymousToken !== undefined && this.anonymousToken !== null && this.anonymousToken.length > 0
  }

  set anonymousToken(value: string | undefined) {
    setCookie("anonymous-token", value)
  }
}
