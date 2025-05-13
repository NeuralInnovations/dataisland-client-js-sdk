


export interface InstaAccountDto {
  id: string
  name: string
  enabled: boolean
  organizationId: string
  token: string
  accountId: string
  additionalContext: string
  folderId: string
}

export interface InstaCutAccountDto {
  id: string
  name: string
  enabled: boolean
}

export interface InstaPostDto {
  id: string
  createdAt: number
  status: PostStatus
  message: string
  history: InstaContentDto[]
}

export interface InstaContentDto {
  accountId: string
  postId: string
  content: string
  url: string
  status: ContentStatus
  error: string
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
