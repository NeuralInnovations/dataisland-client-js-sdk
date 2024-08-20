

export enum QueryFlowStatus {
  IN_PROGRESS = 0,
  ERROR = 1,
  DONE = 100
}

export interface QueryFlowResult {
  fileUrl: string
}

// GET query flow by ID
export interface QueryFlowDto {
  state: QueryFlowStatus,
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
