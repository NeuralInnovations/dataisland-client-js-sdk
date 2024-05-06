import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import {
  AcquiringPlansResponse,
  OrderResponse,
  OrderData,
  UserAcquiringPlan, GetOrderStateResponse, AcquiringPlan, AcquiringSegmentData
} from "../../dto/acquiringResponse"
import { Acquiring } from "./acquiring"
import { Context } from "../../context"
import { Organization } from "../organizations/organization"

export class AcquiringImpl implements Acquiring {
  private _userPlan?: UserAcquiringPlan
  private _plans?: AcquiringPlan[]
  private _limitSegments?: AcquiringSegmentData[]

  constructor(
    private readonly organization: Organization,
    private readonly context: Context) {
  }

  get userPlan(): UserAcquiringPlan {
    return this._userPlan!
  }

  get plans(): AcquiringPlan[] {
    return this._plans!
  }

  get limitSegments(): AcquiringSegmentData[] {
    return this._limitSegments!
  }

  async initialize() {
    const userPlanPromise = this.getUserPlan()
    const plansPromise = this.getPlans()
    const promises = [
      userPlanPromise,
      plansPromise
    ]
    await Promise.all(promises)

    this._userPlan = await userPlanPromise
    const {
      plans,
      limitSegments
    } = await plansPromise
    this._plans = plans
    this._limitSegments = limitSegments
  }

  async createOrder(key: string): Promise<OrderData> {
    const rpc = this.context.resolve(RpcService) as RpcService
    const response = await rpc.requestBuilder("api/v1/Acquiring/order")
      .sendPostJson({
        key: key,
        organizationId: this.organization.id
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to create order", response)
    }

    const order = (await response.json()) as OrderResponse

    return order.data
  }

  async unsubscribe(): Promise<OrderData> {
    const rpc = this.context.resolve(RpcService) as RpcService
    const response = await rpc.requestBuilder("api/v1/Acquiring/unsubscribe").sendDelete()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to unsubscribe", response)
    }

    const order = (await response.json()) as OrderResponse

    return order.data
  }

  async getPlans(): Promise<AcquiringPlansResponse> {
    const rpc = this.context.resolve(RpcService) as RpcService
    const response = await rpc
      .requestBuilder("api/v1/Acquiring/plans")
      .sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to get acquiring plans", response)
    }

    const content = (await response.json()) as AcquiringPlansResponse
    this._plans = content.plans
    this._limitSegments = content.limitSegments

    return content
  }

  async getUserPlan(): Promise<UserAcquiringPlan> {
    const rpc = this.context.resolve(RpcService) as RpcService
    const response = await rpc
      .requestBuilder("api/v1/Acquiring/user/subscription")
      .searchParam("organizationId", <string>this.organization.id)
      .sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to get user subscription", response)
    }

    const content = (await response.json()) as UserAcquiringPlan
    this._userPlan = content

    return content
  }

  async getOrder(orderId: string): Promise<GetOrderStateResponse> {
    const rpc = this.context.resolve(RpcService) as RpcService
    const response = await rpc
      .requestBuilder("api/v1/Acquiring/order/state")
      .searchParam("orderId", orderId)
      .sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to get order", response)
    }

    const content = (await response.json()) as GetOrderStateResponse

    return content
  }
}
