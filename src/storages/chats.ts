import { EventDispatcher } from "../events"
import { Chat } from "./chat"

export enum ChatsEvent {
  ADDED = "added",
  REMOVED = "removed"
}

/**
 * Chats storage.
 */
export abstract class Chats extends EventDispatcher<ChatsEvent, Chat> {
  /**
   * Create new chat.
   */
  abstract create(): Promise<Chat>
}
