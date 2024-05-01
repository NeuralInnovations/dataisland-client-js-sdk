import {
  AcquiringPlansResponse,
  CreateOrederData as CreateOrderData,
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
}
