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
   * Connected file ID.
   */
  abstract get fileId(): string

  /**
   * Connected workspace ID.
   */
  abstract get workspaceIds(): string[]

  /**
   * Model.
   */
  abstract get model(): string

  /**
   * Added client context.
   */
  abstract get clientContext(): string

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
   * Update chat
   */
  abstract update(): Promise<void>

  /**
   * Ask new question in chat.
   */
  abstract ask(message: string, answerType: ChatAnswerType): Promise<Answer | undefined>

}

