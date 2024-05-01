import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import {
  AcquiringPlansResponse,
  CreateOrderResponse,
  CreateOrederData as CreateOrderData,
  UserAcquiringPlan
} from "../../dto/acquiringResponse"
import { Acquiring } from "./acquiring"
import { Context } from "../../context"
import { Organization } from "../organizations/organization"

export class AcquiringImpl implements Acquiring {

  constructor(
    private readonly organization: Organization,
    private readonly context: Context) {
  }

  async createOrder(key: string): Promise<CreateOrderData> {
    const rpc = this.context.resolve(RpcService) as RpcService
    const response = await rpc.requestBuilder("api/v1/Acquiring/order")
      .sendPostJson({
        key: key
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to create order", response)
    }

    const order = (await response.json()) as CreateOrderResponse

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

    return content
  }
}
