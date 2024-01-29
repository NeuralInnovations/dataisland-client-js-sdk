import { Answer } from "./answer"

export type ChatId = string

export enum ChatAnswerType {
  SHORT = "short",
  LONG = "long"
}

export abstract class Chat {

  /**
   * Chat id.
   */
  abstract get id(): ChatId

  /**
   * Chat name.
   */
  abstract get name(): string

  /**
   * Answers list.
   */
  abstract get collection(): ReadonlyArray<Answer>

  /**
   * Ask new question in chat.
   */
  abstract ask(message: string, answer: ChatAnswerType): Promise<Answer>

  /**
   * Delete answer.
   */
  abstract delete(): Promise<void>

  /**
    * Cancel answer.
    */
  abstract cancel(): Promise<void> 

}

