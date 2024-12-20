
import {PaymentInfoResponse, RefundResponse} from "../../dto/acquiringResponse"

export abstract class MaibAdministration {

  /*
  Get payment info
   */
  abstract paymentInfo(): Promise<PaymentInfoResponse>

  /*
  Refund
   */
  abstract refund( userId: string, payId: string, refundAmount: number): Promise<RefundResponse>
}
