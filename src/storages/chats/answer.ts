import {
  AnswerStatus,
  FetchTokensResponse,
  SourceDto,
  StepType
} from "../../dto/chatResponse"

export type AnswerId = string
export type StepId = string

export abstract class Answer {

  /**
   * Answer id.
   */
  abstract get id(): AnswerId

  /**
   * Answer status.
   */
  abstract get status(): AnswerStatus

  /**
   * Answer sources.
   */
  abstract sources(type: StepType): Promise<SourceDto[]>

  /**
   * Fetch answer.
   */
  abstract fetch(): Promise<void>

  /**
   * Fetch answer.
   */
  abstract fetchTokens(type: StepType, tokenStartAt: number): Promise<FetchTokensResponse>

  /**
   * Cancel answer
   */
  abstract cancel(): Promise<void>
}
