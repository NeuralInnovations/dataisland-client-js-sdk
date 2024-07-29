import {WorkspaceId, Workspaces} from "../workspaces/workspaces"
import { OrganizationId } from "./organizations"
import { Groups } from "../groups/groups"
import { Chats } from "../chats/chats"
import { EventDispatcher } from "../../events"
import {
  CurrentLimitsData,
  UserDto,
  UsersStatisticsResponse
} from "../../dto/userInfoResponse"
import { GroupId } from "../groups/group"
import { StatisticsResponse } from "../../dto/statisticsResponse"
import { SegmentData } from "../../dto/limitsResponse"
import {FileId} from "../files/file"
import {QuizData} from "../../dto/quizResponse"
import {InviteResponse} from "../../dto/invitesResponse"
import { OrganizationApiKey } from "../../dto/apiKeyResponse"
import {UploadFile} from "../files/files"

/**
 * Organization event.
 */
export enum OrganizationEvent {
  CHANGED = "changed"
}

/**
 * Organization.
 */
export abstract class Organization extends EventDispatcher<
  OrganizationEvent,
  Organization
> {
  /**
   * Organization id.
   */
  abstract get id(): OrganizationId

  /**
   * Organization name.
   */
  abstract get name(): string

  /**
   * Organization description.
   */
  abstract get description(): string

  /**
   * ID of organization icon
   */
  abstract get icon(): string

  /**
   * Workspaces.
   */
  abstract get workspaces(): Workspaces

  /**
   * Chats.
   */
  abstract get chats(): Chats

  /**
   * Groups.
   */
  abstract get accessGroups(): Groups

  /**
   * Get organization members
   */
  abstract members(): Promise<UserDto[]>

  /**
   *  Get organization statistics
   * @param dateFrom
   * @param dateTo
   */
  abstract statistics(dateFrom: number, dateTo: number): Promise<StatisticsResponse>

  /**
   *  Get organization statistics
   * @param dateFrom
   * @param dateTo
   */
  abstract membersStatistics(dateFrom: number, dateTo: number): Promise<UsersStatisticsResponse>

  /**
   * Get statistics for user
   * @param userid
   * @param dateFrom
   * @param dateTo
   */
  abstract userStatistic(userid: string, dateFrom: number, dateTo: number): Promise<StatisticsResponse>

  /**
   * Get user limits data
   */
  abstract userLimits(): Promise<CurrentLimitsData>

  /**
   * Get default organization limits
   */
  abstract organizationLimits(): Promise<SegmentData>

  /**
   * Get all available segments data
   */
  abstract limitSegments(): Promise<SegmentData[]>

  /**
   * Change organization name and description.
   */
  abstract change(name: string, description: string): Promise<void>

  /**
   * Upload an icon for organization
   * @param icon
   */
  abstract uploadIcon(icon: UploadFile): Promise<string>

  /**
   * Invite users with given emails to organization
   */
  abstract inviteUsers(emails: string[], accessGroups: GroupId[]): Promise<void>

  /**
   * Create invite code for users outside organization
   */
  abstract createInviteCode(accessGroups: GroupId[], validateDomain?: string): Promise<string>

  /**
   * Delete invite code
   */
  abstract deleteInviteCode(code: string): Promise<void>

  /**
   *  Get all invite links for organization
   */
  abstract getOrganizationInvites(): Promise<InviteResponse>

  /**
   * Create new Api key for organization
   * @param name
   * @param accessGroups
   */
  abstract createApiKey(name: string, accessGroups: string[]): Promise<OrganizationApiKey>

  /**
   * Get all organization api keys
   */
  abstract getApiKeys(): Promise<OrganizationApiKey[]>

  /**
   * Delete api key
   */
  abstract deleteApiKey(key: string): Promise<void>

  /**
   * Create quiz for given topic
   * @param workspaces - workspaces to search for topic
   * @param query - search query and quiz topic
   * @param questionsCount - count of quiz tests
   * @param optionsCount - count of one question options
   * @param fileId - file id in case of test-on-file
   */
  abstract createQuiz(workspaces: WorkspaceId[], query: string, questionsCount: number, optionsCount: number, fileId: FileId): Promise<QuizData>
}
