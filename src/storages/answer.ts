import { SourceDto } from "../dto/chatResponse";

export type AnswerId = string
export type StepId = string

export abstract class Answer {

  /**
   * Answer id.
   */
  abstract get id(): AnswerId

  /**
   * Answer sources.
   */
  abstract get sources(): SourceDto[]

  /**
   * Fetch answer.
   */
  abstract fetch(startAt: number): Promise<void>


  /**
   * Fetch answer.
   */
  abstract fetch_tokens(stepId: StepId, tokensStartAt: number): Promise<void>
}