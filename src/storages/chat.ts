import { EventDispatcher } from '../events'

export type ChatId = string

export enum ChatsEvent {
  ADDED = 'added',
  REMOVED = 'removed'
}

export enum ChatAnswer {
  SHORT = 'short',
  LONG = 'long'
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

  abstract question(message: string, answer?: ChatAnswer): Promise<void>
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
