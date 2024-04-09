import { BadRequest } from "../dto/badRequestResponse"
import { Response } from "../utils/request"

export class ResponseUtils {
  public static isOk(response?: Response | null): boolean {
    return response !== undefined && response !== null && response.ok
  }

  public static isFail(response?: Response | null): boolean {
    return !ResponseUtils.isOk(response)
  }

  public static async isLimitReached(response?: Response | null): Promise<boolean> {
    if (response?.status == 15){
      if (((await response?.json()) as BadRequest).code == 15){
        return true
      }
    }
    return false
  }

  public static async throwError(
    message: string,
    response: Response | undefined | null
  ): Promise<void> {
    if (response === undefined) {
      throw new Error(`${message}. Response is undefined`)
    }
    if (response === null) {
      throw new Error(`${message}. Response is null`)
    }
    let errorBody: string = ""
    if (response) {
      try {
        errorBody = (await response.text()) ?? ""
      } catch (e) {
        console.error(e)
      }
    }
    throw new Error(
      `${message}. Response fail. Status: ${response?.status},${response?.statusText}, body: ${errorBody}`
    )
  }
}
