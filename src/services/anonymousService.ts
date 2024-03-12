import { Service } from "./service"
import { CookieService } from "./cookieService"
import { createFingerprint } from "../utils/browserUtils"
import { RpcService } from "./rpcService"
import { ResponseUtils } from "./responseUtils"

export class AnonymousService extends Service {

  async getToken(): Promise<{ token: string, isValid: boolean }> {
    const cookie = this.resolve(CookieService)!
    let token = cookie.anonymousToken
    if (token === undefined || token === null || token.length === 0) {
      const fingerprint = createFingerprint()
      const response = await this.context
        .resolve(RpcService)
        ?.requestBuilder("api/v1/Users/anonymous")
        .sendPutJson({
          info: {
            fingerprint: JSON.stringify({
              userAgent: fingerprint.get("userAgent"),
              language: fingerprint.get("language"),
              hardwareConcurrency: fingerprint.get("hardware_concurrency"),
              cookieEnabled: fingerprint.get("cookie_enabled"),
              pixelRatio: fingerprint.get("pixel_ratio")
            })
          }
        })

      if (ResponseUtils.isFail(response)) {
        await ResponseUtils.throwError("Failed to create anonymous token", response)
      }

      token = (await response!.json() as { token: string }).token

      cookie.anonymousToken = token!
    }

    return {
      token: token!,
      isValid: token !== undefined && token !== null && token.length > 0
    }
  }
}
