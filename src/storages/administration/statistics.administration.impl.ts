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
    dateFrom: Date,
    dateTo: Date
  ): Promise<OrganizationMembersStatisticResponse> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/stats/organization/members/total")
      .searchParam("organizationId", organizationId)
      .searchParam("dateFrom", dateFrom.toISOString())
      .searchParam("dateTo", dateTo.toISOString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to get statistics", response)
    }

    return await response!.json() as OrganizationMembersStatisticResponse
  }

  async getOrganizations(dateFrom: Date, dateTo: Date): Promise<OrganizationStatisticResponse> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/management/stats/organizations")
      .searchParam("dateFrom", dateFrom.toISOString())
      .searchParam("dateTo", dateTo.toISOString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to get statistics", response)
    }

    return await response!.json() as OrganizationStatisticResponse
  }
}
