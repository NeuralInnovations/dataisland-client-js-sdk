import { StatisticAdministration } from "./statistics.administration"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import {
  OrganizationMembersStatisticResponse,
  OrganizationStatisticResponse
} from "../../dto/administration"
import { OrganizationId } from "../organizations/organizations"
import { Context } from "../../context"

export class StatisticAdministrationImpl implements StatisticAdministration {
  constructor(private readonly context: Context) {
  }

  async getOrganizationMembers(
    organizationId: OrganizationId,
    dateFrom: number,
    dateTo: number
  ): Promise<OrganizationMembersStatisticResponse> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Stats/internal/organization/members/total")
      .searchParam("organizationId", organizationId)
      .searchParam("dateFrom", dateFrom.toString())
      .searchParam("dateTo", dateTo.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to get statistics", response)
    }

    return await response!.json() as OrganizationMembersStatisticResponse
  }

  async getOrganizations(dateFrom: number, dateTo: number): Promise<OrganizationStatisticResponse> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("/api/v1/Stats/internal/organizations")
      .searchParam("dateFrom", dateFrom.toString())
      .searchParam("dateTo", dateTo.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to get statistics", response)
    }

    return await response!.json() as OrganizationStatisticResponse
  }
}
