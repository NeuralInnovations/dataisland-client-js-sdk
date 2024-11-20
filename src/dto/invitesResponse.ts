

export interface InviteCodeResponse {
  code: string
}

export interface InviteResponse {
  inviteLinks: InviteLink[]
  users: UserInviteData[]
}

export interface InviteLink {
  organizationId: string
  createdBy: string
  accessGroupIds: string[]
  code: string
  expireAt: 0
  usages: 0
}

export interface UserInviteData {
  id: string
  name: string
  email: string
}

export interface EmailsWhitelistResponse{
  emails: string[]
}
