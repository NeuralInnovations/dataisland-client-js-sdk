import {
  AcquiringPlan,
  AcquiringPlansResponse, AcquiringSegmentData,
  CreateOrderData as CreateOrderData, GetOrderStateResponse,
  UserAcquiringPlan
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
  abstract createOrder(key: string): Promise<CreateOrderData>

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
