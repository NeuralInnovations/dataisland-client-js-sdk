import {
  AnswerDto,
  AnswerStatus,
  FetchTokensResponse,
  SourceDto,
  StepType
} from "../../dto/chatResponse"
import { EventDispatcher } from "../../events"

export type AnswerId = string
export type StepId = string

export enum AnswerEvent {
  ADDED = "added",
  CANCALLED = "cancelled",
  UPDATED = "updated"
}

export abstract class Answer extends EventDispatcher<AnswerEvent, Answer> {

  /**
   * Answer id.
   */
  abstract get id(): AnswerId

  /**
   * Answer data object
   */
  abstract get content(): AnswerDto

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
