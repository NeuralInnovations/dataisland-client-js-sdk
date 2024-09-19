export enum QueryFlowState {
  IN_PROGRESS = 0,
  ERROR = 1,
  DONE = 100
}

export enum QueryFlowStatus {
  STARTED = 0,
  UPLOADING_FILE = 1,
  PROCESSING_FILE = 2,
  PREPARING_RESULTS = 3,
  DONE = 4,
  FAILED = 5
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
  state: QueryFlowState,
  status: QueryFlowStatus,
  result: QueryFlowResult
}

// GET org query flows
export interface QueryFlowListResponse {
  flowIds: string[]
}

// POST Create query flow
export interface QueryFlowResponse {
  flowId: string
}
