import {
  AcquiringPlan,
  AcquiringPlansResponse, AcquiringSegmentData,
  OrderData, GetOrderStateResponse,
  UserAcquiringPlan, UnsubscribeResponse
} from "../../dto/acquiringResponse"

/**
 * Acquiring service
 */
export abstract class Acquiring {

  /**
   * Plan
   */
  abstract get userPlan(): UserAcquiringPlan

  /**
   * Plans
   */
  abstract get plans(): AcquiringPlan[]

  /**
   * Limit segments
   */
  abstract get limitSegments(): AcquiringSegmentData[]

  /**
   * Create order
   * @param key
   */
  abstract createOrder(key: string): Promise<OrderData>

  /**
   * Unsubscribe
   */
  abstract unsubscribe(): Promise<UnsubscribeResponse>

  /**
   * Update plans
   */
  abstract getPlans(): Promise<AcquiringPlansResponse>

  /**
   * Update user plan
   */
  abstract getUserPlan(): Promise<UserAcquiringPlan>

  /**
   * Get order
   * @param orderId
   */
  abstract getOrder(orderId: string): Promise<GetOrderStateResponse>
}
