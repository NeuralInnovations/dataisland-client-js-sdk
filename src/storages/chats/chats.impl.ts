import { Context } from "../../context"
import { ChatDto, ChatListResponse } from "../../dto/chatResponse"
import { ResponseUtils } from "../../services/responseUtils"
import { RpcService } from "../../services/rpcService"
import { OrganizationImpl } from "../organizations/organization.impl"
import { OrganizationId } from "../organizations/organizations"
import { Chat } from "./chat"
import { ChatImpl } from "./chat.impl"
import { Chats, ChatsEvent } from "./chats"
import {LibraryId} from "../library/libraryId"
import {LibrariesService} from "../../services/librariesService"

export class ChatsImpl extends Chats {
  private readonly _chats: Chat[] = []

  constructor(
    public readonly organization: OrganizationImpl,
    private readonly context: Context
  ) {
    super()
  }

  async initFrom(organizationId: OrganizationId): Promise<void> {
    await this.loadOrganizationChats(organizationId)
    const libraries = (this.context.resolve(LibrariesService) as LibrariesService).libraries.collection
    for (const library of libraries){
      await this.loadLibraryChats(library.id)
    }

    this._chats.sort((a, b) => b.modifiedAt - a.modifiedAt)
  }

  async loadOrganizationChats(organizationId: OrganizationId): Promise<void> {
    // init chats from the server's response
    const limit = 100
    const page = 0
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/list")
      .searchParam("organizationId", organizationId)
      .searchParam("limit", limit.toString())
      .searchParam("page", page.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Chats list org id:${organizationId}, page:${page}, limit:${limit}, failed`,
        response
      )
    }

    // parse chats from the server's response
    const chats = (await response!.json()) as ChatListResponse

    // init chats
    for (const cht of chats.chats) {
      // create chat implementation
      const chat = await new ChatImpl(this.context, this.organization).initFrom(cht)

      // add chat to the collection
      this._chats.push(chat)

      // dispatch event
      this.dispatch({
        type: ChatsEvent.ADDED,
        data: chat
      })
    }
  }

  async loadLibraryChats(libraryId: LibraryId): Promise<void>{
    // init chats from the server's response
    const limit = 100
    const page = 0
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/list/library")
      .searchParam("libraryId", libraryId)
      .searchParam("limit", limit.toString())
      .searchParam("page", page.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Chats list library id:${libraryId}, page:${page}, limit:${limit}, failed`,
        response
      )
    }

    // parse chats from the server's response
    const chats = (await response!.json()) as ChatListResponse

    // init chats
    for (const cht of chats.chats) {
      // create chat implementation
      const chat = await new ChatImpl(this.context, this.organization).initFrom(cht)

      // add chat to the collection
      this._chats.push(chat)

      // dispatch event
      this.dispatch({
        type: ChatsEvent.ADDED,
        data: chat
      })
    }
  }

  get collection(): readonly Chat[] {
    return this._chats
  }

  get(id: string): Chat {
    return <Chat>this.tryGet(id)
  }

  tryGet(id: string): Chat | undefined {
    return this._chats.find(chat => chat.id === id)
  }

  async create(model: string, clientContext: string = ""): Promise<Chat | undefined> {
    if (model === undefined || model === null) {
      throw new Error("Create chat, model is undefined or null")
    }

    if (model.length === 0) {
      throw new Error("Create chat, model is empty")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/workspaces")
      .sendPostJson({ organizationId: this.organization.id, model: model, clientContext: clientContext })

    // check response status
    if (ResponseUtils.isFail(response)) {
      if (await ResponseUtils.isLimitReached()){
        return undefined
      }

      await ResponseUtils.throwError(`Failed to create chat, organization: ${this.organization.id}`, response)
    }

    // parse workspace from the server's response
    const content = (await response!.json() as {
      chat: ChatDto
    }).chat as ChatDto

    // create workspace implementation
    const chat = new ChatImpl(this.context, this.organization)
    await chat.initFrom(content)

    // add chat to the collection
    this._chats.push(chat)

    // dispatch event
    this.dispatch({
      type: ChatsEvent.ADDED,
      data: chat
    })

    return chat
  }

  async createWithFile(fileId: string): Promise<Chat | undefined> {
    if (fileId === undefined || fileId === null) {
      throw new Error("Create chat with file, id is undefined or null")
    }
    if (fileId.length === 0 || fileId.trim().length === 0) {
      throw new Error("Create chat with file, id is empty")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/file")
      .sendPostJson({ 
        organizationId: this.organization.id,
        fileId: fileId,
        model: "search"
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      if (await ResponseUtils.isLimitReached()){
        return undefined
      }

      await ResponseUtils.throwError(`Failed to create chat, organization: ${this.organization.id}`, response)
    }

    // parse workspace from the server's response
    const content = (await response!.json() as {
      chat: ChatDto
    }).chat as ChatDto

    // create workspace implementation
    const chat = new ChatImpl(this.context, this.organization)
    await chat.initFrom(content)

    // add chat to the collection
    this._chats.push(chat)

    // dispatch event
    this.dispatch({
      type: ChatsEvent.ADDED,
      data: chat
    })

    return chat
  }

  async createWithWorkspace(workspaceIds: string[], clientContext: string = ""): Promise<Chat | undefined> {
    if (workspaceIds === undefined || workspaceIds === null) {
      throw new Error("Create chat with workspace, ids are undefined or null")
    }
    if (workspaceIds.length === 0) {
      throw new Error("Create chat with workspace, ids are empty")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/workspaces")
      .sendPostJson({
        organizationId: this.organization.id,
        model: "search",
        clientContext: clientContext,
        workspaceIds: workspaceIds
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      if (await ResponseUtils.isLimitReached()){
        return undefined
      }

      await ResponseUtils.throwError(`Failed to create chat in workspace, organization: ${this.organization.id}`, response)
    }

    // parse workspace from the server's response
    const content = (await response!.json() as {
      chat: ChatDto
    }).chat as ChatDto

    // create workspace implementation
    const chat = new ChatImpl(this.context, this.organization)
    await chat.initFrom(content)

    // add chat to the collection
    this._chats.push(chat)

    // dispatch event
    this.dispatch({
      type: ChatsEvent.ADDED,
      data: chat
    })

    return chat
  }

  async createWithLibraryFolder(libraryId: string, folderIds: string[] | null = null): Promise<Chat | undefined>{
    if (libraryId === undefined || libraryId === null || libraryId.trim() === "")  {
      throw new Error("Create chat with library folder, library id is undefined, null or empty")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/chats/library/folders")
      .sendPostJson({
        libraryId: libraryId,
        folderIds: folderIds,
        model: "search",
        clientContext: "",
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      if (await ResponseUtils.isLimitReached()){
        return undefined
      }

      await ResponseUtils.throwError(`Failed to create chat in library with folder, library: ${libraryId}`, response)
    }

    // parse workspace from the server's response
    const content = (await response!.json() as {
      chat: ChatDto
    }).chat as ChatDto

    // create workspace implementation
    const chat = new ChatImpl(this.context, this.organization)
    await chat.initFrom(content)

    // add chat to the collection
    this._chats.push(chat)

    // dispatch event
    this.dispatch({
      type: ChatsEvent.ADDED,
      data: chat
    })

    return chat
  }

  async createWithLibraryFile(libraryId: string, fileId: string): Promise<Chat | undefined>{
    if (libraryId === undefined || libraryId === null || libraryId.trim() === "")  {
      throw new Error("Create chat with library file, library id is undefined, null or empty")
    }

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/chats/library/file")
      .sendPostJson({
        libraryId: libraryId,
        fileId: fileId,
        model: "search",
        clientContext: "",
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      if (await ResponseUtils.isLimitReached()){
        return undefined
      }

      await ResponseUtils.throwError(`Failed to create chat in library with file, library: ${libraryId}`, response)
    }

    // parse workspace from the server's response
    const content = (await response!.json() as {
      chat: ChatDto
    }).chat as ChatDto

    // create workspace implementation
    const chat = new ChatImpl(this.context, this.organization)
    await chat.initFrom(content)

    // add chat to the collection
    this._chats.push(chat)

    // dispatch event
    this.dispatch({
      type: ChatsEvent.ADDED,
      data: chat
    })

    return chat
  }




  async delete(id: string): Promise<void> {
    // get chat by id
    const chat = <ChatImpl>this.tryGet(id)

    // check if chat is found
    if (!chat) {
      throw new Error(`Chat ${id} is not found, organization: ${this.organization.id}`)
    }

    // send delete request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats")
      .searchParam("id", id)
      .sendDelete()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed to delete chat: ${id}, organization: ${this.organization.id}`,
        response
      )
    }

    // remove chat from the collection
    const index = this._chats.indexOf(<ChatImpl>chat)
    if (index < 0) {
      throw new Error(`Chat ${id} is not found, organization: ${this.organization.id}`)
    }
    this._chats.splice(index, 1)

    // dispatch event
    this.dispatch({
      type: ChatsEvent.REMOVED,
      data: chat
    })
  }
}
