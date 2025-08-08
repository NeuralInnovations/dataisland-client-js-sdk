


export interface InstaAccountDto {
  id: string
  organizationId: string
  status: AccountStatus
  enabled: boolean
  username: string
  twoFactorKey: string
  proxy: string
  additionalContext: string
  conversationContext: string
  folderId: string
  error: string
  postCron: string[]
  postTimezone: string
  directCron: string[]
  directTimezone: string
}


export interface InstaCutAccountDto {
  id: string
  status: AccountStatus
  username: string
  enabled: boolean
}

export interface InstaPostDto {
  id: string
  createdAt: number
  status: PostStatus
  history: InstaContentDto[]
}

export interface InstaContentDto {
  accountId: string
  postId: string
  content: string
  url: string
  modifiedAt: number
  status: ContentStatus
  error: string
}

export interface InstaErrorDto {
  id: string
  createdAt: number
  message: string
  accountId: string
  postId: string
}

export enum PostStatus {
  Generation = 0,
  Finished = 1
}

export enum ContentStatus {
  Generation = 0,
  Finished = 1,
  Error = 2
}

export enum AccountStatus {
  None = 0,
  Created = 1,
  Authenticated = 2,
  Error = 3,
  NeedContent = 4
}


