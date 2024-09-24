import { Answer } from "./answer"
import { Organization } from "../organizations/organization"
import {ChatResourceDto} from "../../dto/chatResponse"

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
   * Chat resource info : type ChatType, related entities Ids.
   */
  abstract get resource(): ChatResourceDto

  /**
   * Model.
   */
  abstract get model(): string

  /**
   * CreateAt.
   */
  abstract get createAt(): number

  /**
   * Modified at.
   */
  abstract get modifiedAt(): number

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

