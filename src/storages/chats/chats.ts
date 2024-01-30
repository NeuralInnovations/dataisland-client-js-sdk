import { EventDispatcher } from "../../events"
import { Chat, ChatId } from "./chat"

export enum ChatsEvent {
  ADDED = "added",
  REMOVED = "removed"
}

/**
 * Chats storage.
 */
export abstract class Chats extends EventDispatcher<ChatsEvent, Chat> {

  /**
   * Chats list.
   */
  abstract get collection(): ReadonlyArray<Chat>

  /**
   * Create new chat.
   */
  abstract create(): Promise<Chat>

  /**
   * Get chat by id.
   * @param id
   */
  abstract get(id: ChatId): Chat

  /**
   * Try to get chat by id.
   * @param id
   */
  abstract tryGet(id: ChatId): Chat | undefined

  /**
   * Delete chat.
   * @param id
   */
  abstract delete(id: ChatId): Promise<void>
}
