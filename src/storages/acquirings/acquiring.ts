import {
  AcquiringPlansResponse,
  CreateOrderData as CreateOrderData, GetOrderStateResponse,
  UserAcquiringPlan
} from "../../dto/acquiringResponse"

/**
 * Acquiring service
 */
export abstract class Acquiring {

  /**
   * Create order
   * @param key
   */
  abstract createOrder(key: string): Promise<CreateOrderData>

  /**
   * Get plans
   */
  abstract getPlans(): Promise<AcquiringPlansResponse>

  /**
   * Get user plan
   */
  abstract getUserPlan(): Promise<UserAcquiringPlan>

  /**
   * Get order
   * @param orderId
   */
  abstract getOrder(orderId: string): Promise<GetOrderStateResponse>
}
