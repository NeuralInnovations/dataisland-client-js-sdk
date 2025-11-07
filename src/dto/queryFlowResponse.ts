export enum QueryFlowState {
  IN_QUEUE = 0,
  IN_PROGRESS = 50,
  ANALYTICS = 75,
  PREPARING_RESULTS = 80,
  ERROR = 99,
  DONE = 100
}

export interface QueryFileUrlDto {
  name: string
  extension: string
  url: string
}

export interface QueryFlowResult {
  files: QueryFileUrlDto[]
}

// GET query flow by ID
export interface QueryFlowDto {
  name: string
  userId: string
  createdAt: number
  modifiedAt: number
  state: QueryFlowState,
  totalRowsCount: number
  completedRowsCount: number
  result: QueryFlowResult
  error: string
}

// GET org query flows
export interface QueryFlowListResponse {
  flowIds: string[]
}

// POST Create query flow
export interface QueryFlowResponse {
  flowId: string
}

export class SearchResource {
  organizationId: string
  workspaceIds: string[]

  constructor(organizationId: string, workspaceIds: string[]){
    this.organizationId = organizationId
    this.workspaceIds = workspaceIds
  }
}

export class LibraryResource {
  libraryId: string

  constructor(libraryId: string){
    this.libraryId = libraryId
  }
}
