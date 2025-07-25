import { EventDispatcher } from "../../events"
import { Chat, ChatId } from "./chat"
import { Organization } from "../organizations/organization"

export enum ChatsEvent {
  ADDED = "added",
  REMOVED = "removed"
}

/**
 * Chats storage.
 */
export abstract class Chats extends EventDispatcher<ChatsEvent, Chat> {

  /**
   * Organization.
   */
  abstract get organization(): Organization

  /**
   * Chats list.
   */
  abstract get collection(): ReadonlyArray<Chat>

  /**
   * Load organization chats
   */
  abstract load(): Promise<void>

  /**
   * Create new chat.
   */
  abstract create(model: string, clientContext: string): Promise<Chat | undefined>

  /**
   * Create chat with specific file
   * @param fileId 
   */
  abstract createWithFile(fileId: string): Promise<Chat | undefined>

  /**
   * Create chat with specific workspace
   * @param workspaceIds
   * @param clientContext
   */
  abstract createWithWorkspace(workspaceIds: string[], clientContext: string): Promise<Chat | undefined>

  /**
   * Create chat with library folders
   * @param libraryId
   * @param folderIds
   */
  abstract createWithLibraryFolder(libraryId: string, folderIds: string[]): Promise<Chat | undefined>

  /**
   * Create chat with library file
   * @param libraryId
   * @param fileId
   */
  abstract createWithLibraryFile(libraryId: string, fileId: string): Promise<Chat | undefined>

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
