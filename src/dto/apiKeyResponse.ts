

export interface TokenResponse {
  userJwtToken: string
  authSchemaName: string
}

export interface ApiKeyResponse {
  apiKey: OrganizationApiKey
}

export interface OrganizationKeysResponse {
  keys: OrganizationApiKey[]
}

export interface OrganizationApiKey {
  keyName: string
  apiKey: string
  tokensCreated: number
  createdAt: number
  lastTokenCreatedAt: number
  accessGroupInfo: AccessGroupInfo[]
}

export interface AccessGroupInfo {
  id: string
  name: string
  type: number
}
