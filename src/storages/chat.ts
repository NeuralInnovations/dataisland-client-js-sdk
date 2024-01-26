export type ChatId = string

export enum ChatAnswer {
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

  abstract question(message: string, answer?: ChatAnswer): Promise<void>
}

