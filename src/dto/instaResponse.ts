


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

export interface InstaPostResult {
  success: boolean
  error: string
}
