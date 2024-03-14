import { Response } from "../utils/request"

export class ResponseUtils {
  public static isOk(response?: Response | null): boolean {
    return response !== undefined && response !== null && response.ok
  }

  public static isFail(response?: Response | null): boolean {
    return !ResponseUtils.isOk(response)
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
