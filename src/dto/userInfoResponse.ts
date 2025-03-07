import { WorkspaceDto } from "./workspacesResponse"
import { UserId } from "../storages/user/userProfile"
import { OrganizationId } from "../storages/organizations/organizations"
import { StatisticsData } from "./statisticsResponse"
import { LimitActionType, SegmentData } from "./limitsResponse"
import {AcquiringPlan} from "./acquiringResponse"

export interface UserInfoResponse {
  adminInOrganization: string[]
  organizations: OrganizationDto[]
  user: UserDto
}

export interface SearchUsersResponse {
  users: SearchUserResponse[]
  allSubscriptionPlans: AcquiringPlan[]
  allLimitSegments: SegmentData[]
  listResult: ListResultDto
}

export interface SearchUserResponse {
  userInfo: UserDto
  organizations: OrganizationDto[]
  limits: UserLimitsInfo[]
  segmentKey: string
}

export interface UserLimitsInfo {
  action: LimitActionType
  records: UserLimitRecord[]
}

export interface UserLimitRecord {
  daysCount: number,
  countLimit: number,
  tokenLimit: number,
  activeTill: number
}

export interface UserDto {
  id: UserId
  isDeleted: boolean
  isAnonymousMode: boolean
  created_at: number
  modified_at: number
  profile: ProfileDto
  settings?: UserSettings | null
}

export interface ProfileDto {
  name: string
  email: string
  binanceId: string
  educationalInstitution: string
}

export interface UserSettings {
  activeOrganizationId: string
  activeWorkspaceId: string
  limitSegmentKey: string
}

export interface OrganizationProfileDto {
  name: string
  description: string
  iconId: string
  isAllowedInLibraries: boolean
}

export interface OrganizationDto {
  id: OrganizationId
  createdAt: number
  modifiedAt: number
  membersCount: number
  profile: OrganizationProfileDto
}

export interface OrganizationPromptDto {
  key: string
  value: string | null
}

export interface OrganizationWorkspaces extends OrganizationDto {
  workspaces: WorkspaceDto[]
}

export interface MembersResponse {
  members: UserDto
}

export interface ApplyInviteCodeResponse {
  organizationId: string
  addedToNewGroupsCounter: number
  isAddedToOrganization: boolean
}

export interface UsersStatisticsResponse {
  dateFrom: string
  dateTo: string
  membersData: UserStatisticsData[]
}

export interface UserStatisticsData {
  userId: UserId
  data: StatisticsData[]
}

export interface OrganizationSegmentData {
  segment: SegmentData
}

export interface UserLimitsData {
  userSegment: SegmentData
  userLimits: UserLimitData[]
}

export interface UserLimitData {
  action: LimitActionType
  records: UserLimitRecordData[]
}

export interface UserLimitRecordData {
  daysCount: number
  countLimit: number
  tokenLimit?: number
  activeTill: number
}

export interface CurrentLimitsData {
  segment: string
  limits: CurrentLimitItem[]
}

export interface CurrentLimitItem {
  action: LimitActionType
  records: CurrentLimitRecordData[]
}

export interface CurrentLimitRecordData {
  daysCount: number
  used: number
  all: number
  activeTill: number
}

export interface ListResultDto {
  limit: number
  page: number
  totalRecords: number
}
