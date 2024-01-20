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
  settings: UserSettings
}

export interface ProfileDto {
  name: string
  email: string
}

export interface UserSettings {
  activeOrganizationId: string
  activeWorkspaceId: string
}

export interface OrganizationDto {
  isActive?: boolean
  id: string
  createdAt: number
  modifiedAt: number
  membersCount: number
  moderatorsCount: number
  profile: ProfileDto
}
