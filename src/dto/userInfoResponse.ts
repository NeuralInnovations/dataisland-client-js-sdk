import { WorkspaceDto } from "./workspacesResponse"
import { UserId } from "../storages/user/userProfile"
import { OrganizationId } from "../storages/organizations/organizations"

export interface UserInfoResponse {
  adminInOrganization: string[]
  organizations: OrganizationDto[]
  user: UserDto
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
}

export interface UserSettings {
  activeOrganizationId: string
  activeWorkspaceId: string
}

export interface OrganizationProfileDto {
  name: string
  description: string
}

export interface OrganizationDto {
  id: OrganizationId
  createdAt: number
  modifiedAt: number
  membersCount: number
  profile: OrganizationProfileDto
}

export interface OrganizationWorkspaces extends OrganizationDto {
  workspaces: WorkspaceDto[]
}

export interface MembersResponse {
  members: UserDto
}
