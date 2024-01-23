import { type Event } from './events'
import { type Disposable } from './disposable'

export type ChatId = string
export type FileId = string

export enum FileEvent {
  ADDED,
  REMOVED,
  UPDATED
}

export enum ChatEvent {
  ADDED,
  REMOVED,
  UPDATED
}

export enum ChatMessageEvent {
  ADDED,
  REMOVED,
  UPDATED
}

export interface File {
  id: FileId
  name: string

  download: () => Promise<void>
}

export interface Files {
  files: File[]
  on: (callback: (event: Event<FileEvent, File>) => void) => Disposable
  fetch: () => Promise<void>
  upload: (path: string, name: string) => Promise<File>
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ChatMessage {}

export interface Chat {
  id: ChatId
  name: string
  on: (
    callback: (event: Event<ChatMessageEvent, ChatMessage>) => void
  ) => Disposable
  messages: ChatMessage[]
  fetch: () => Promise<void>
  subscribe: () => void
  unsubscribe: () => void
}

export interface Chats {
  chats: Chat[]
  newChat: (name: string) => Promise<Chat>
  on: (callback: (event: Event<ChatEvent, Chat>) => void) => Disposable
  fetch: () => Promise<void>
}

export interface Invites {
  invite: (email: string) => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Statistics {}
