import { Answer } from "./answer"
import { Organization } from "../organizations/organization"

export type ChatId = string

export enum ChatAnswerType {
  SHORT = "short",
  LONG = "long"
}

export abstract class Chat {

  /**
   * Organization.
   */
  abstract get organization(): Organization

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
   * Get answer by id
   * @param id answer id
   */
  abstract getAnswer(id: string): Answer

  /**
   * Ask new question in chat.
   */
  abstract ask(message: string, answerType: ChatAnswerType): Promise<Answer>

}

