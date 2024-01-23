export interface UserInfoResponse {
  adminInOrganization: string[]
  organizations: OrganizationDto[]
  user: UserDto
}

export interface UserDto {
  id: string
  isDeleted: boolean
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
  id: string
  createdAt: number
  modifiedAt: number
  membersCount: number
  profile: OrganizationProfileDto
}
