import { Service } from "./service"
import { RpcService } from "./rpcService"
import { ResponseUtils } from "./responseUtils"
import { AcquiringPlansResponse, CreateOrderResponse, CreateOrederData as CreateOrderData, UserAcquiringPlan } from "../dto/acquiringResponse"

export class AcquiringService extends Service {

  async create_order(key: string): Promise<CreateOrderData>{
    const rpc = this.resolve(RpcService) as RpcService
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

  async get_plans(): Promise<AcquiringPlansResponse> {
    const rpc = this.resolve(RpcService) as RpcService
    const response = await rpc.requestBuilder("api/v1/Acquiring/plans").sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to get acquiring plans", response)
    }

    const content = (await response.json()) as AcquiringPlansResponse

    return content
  }

  async get_user_plan(): Promise<UserAcquiringPlan> {
    const rpc = this.resolve(RpcService) as RpcService
    const response = await rpc.requestBuilder("api/v1/Acquiring/user/subscription").sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to get user subscription", response)
    }

    const content = (await response.json()) as UserAcquiringPlan

    return content
  }
}
