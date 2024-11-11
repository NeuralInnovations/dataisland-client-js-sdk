import { OrganizationId } from "../storages/organizations/organizations"
import { UserId } from "../storages/user/userProfile"

export interface OrganizationStatisticDataDto {
  modelName: string,
  promptUsage: 0,
  completionUsage: 0
}

export interface OrganizationStatisticDto {
  organizationId: OrganizationId
  organizationName: string
  totalUsage: number
  data: OrganizationStatisticDataDto[]
}

export interface OrganizationStatisticResponse {
  dateFrom: string,
  dateTo: string,
  organizationStats: OrganizationStatisticDto[]
}

export interface OrganizationMemberStatisticDto {
  userId: UserId
  userEmail: string
  totalUsage: number
  data: OrganizationStatisticDataDto[]
}

export interface OrganizationMembersStatisticResponse {
  dateFrom: string,
  dateTo: string,
  membersStats: OrganizationMemberStatisticDto[]
}
