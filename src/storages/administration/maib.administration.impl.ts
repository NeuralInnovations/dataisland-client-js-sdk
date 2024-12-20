import {PaymentInfoResponse, RefundResponse} from "../../dto/acquiringResponse"
import {MaibAdministration} from "./maib.administration"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import {Context} from "../../context"


export class MaibAdministrationImpl extends MaibAdministration {
  private context: Context

  constructor(context: Context) {
    super()
    this.context = context
  }


  /*
  Get payment info
   */
  async paymentInfo(): Promise<PaymentInfoResponse>{
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/acquiring/maib/payment/info")
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to get payment info", response)
    }

    return await response!.json() as PaymentInfoResponse
  }

  /*
  Refund
   */
  async refund( userId: string, payId: string, refundAmount: number): Promise<RefundResponse>{
    if (userId === undefined || userId === null || userId.trim() === "") {
      throw new Error("userId is required, must be not empty")
    }

    if (payId === undefined || payId === null || payId.trim() === "") {
      throw new Error("payId is required, must be not empty")
    }

    if (refundAmount === undefined || refundAmount === null || refundAmount === 0) {
      throw new Error("refundAmount is required, must be not empty and grater than 0")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/acquiring/maib/refund")
      .sendPostJson({
        userId: userId,
        payId: payId,
        refundAmount: refundAmount
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to create refund for user ${userId} and payment ${payId}`, response)
    }

    return await response!.json() as RefundResponse
  }
}
