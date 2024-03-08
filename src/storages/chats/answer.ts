import {
  AnswerStatus,
  SourceDto
} from "../../dto/chatResponse"
import { EventDispatcher } from "../../events"

export type AnswerId = string
export type StepId = string

export enum AnswerEvent {
  ADDED = "added",
  CANCALLED = "cancelled",
  FAILED = "failed",
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
  abstract get question(): string

  /**
   * Answer tokens
   */
  abstract get tokens(): string

  /**
   * Answer status.
   */
  abstract get status(): AnswerStatus

  /**
   * Answer sources.
   */
  abstract get sources(): SourceDto[]

  /**
   * Answer time.
   */
  abstract get timestamp(): number

  /**
   * Cancel answer
   */
  abstract cancel(): Promise<void>
}
