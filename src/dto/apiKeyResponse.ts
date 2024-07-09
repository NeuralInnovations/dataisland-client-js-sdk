

export interface TokenResponse {
  userJwtToken: string
  authSchemaName: string
}

export interface ApiKeyResponse {
  apiKey: string
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
}
