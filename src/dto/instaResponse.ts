


export interface InstaAccountDto {
  id: string
  name: string
  organizationId: string
  token: string
  accountId: string
  additionalContext: string
  folderId: string
}

export interface InstaCutAccountDto {
  id: string
  name: string
}

export interface InstaPostDto {
  id: string
  status: PostStatus
  message: string
  postsLeft: number
}

export enum PostStatus {
  Generation = 0,
  Finished = 1
}
