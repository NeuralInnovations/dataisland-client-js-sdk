import { Context } from "../../context"
import { ChatDto, ChatListResponse } from "../../dto/chatResponse"
import { ResponseUtils } from "../../services/responseUtils"
import { RpcService } from "../../services/rpcService"
import { OrganizationImpl } from "../organizations/organization.impl"
import { OrganizationId } from "../organizations/organizations"
import { Chat } from "./chat"
import { ChatImpl } from "./chat.impl"
import { Chats, ChatsEvent } from "./chats"



export class ChatsImpl extends Chats {
  private readonly _chats: Chat[] = []

  constructor(
    private readonly organization: OrganizationImpl,
    private readonly context: Context
  ) {
    super()
  }

  async initFrom(organizationId: OrganizationId): Promise<void> {
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

    const chats = (await response!.json()) as ChatListResponse

    for (const cht of chats.chats){
      const chat = await new ChatImpl(this.context).initFrom(cht)

      this._chats.push(chat)

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
  
  async create(): Promise<Chat> {

    // send create request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats")
      .sendPostJson({ organizationId: this.organization.id, })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to create workspace", response)
    }

    // parse workspace from the server's response
    const content = (await response!.json()).chat as ChatDto

    // create workspace implementation
    const chat = new ChatImpl(this.context)
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
      throw new Error(`Chat ${id} is not found`)
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
        `Failed to delete chat: ${id}`,
        response
      )
    }
 
    // remove chat from the collection
    const index = this._chats.indexOf(<ChatImpl>chat)
    if (index < 0) {
      throw new Error(`Chat ${id} is not found`)
    }
    this._chats.splice(index, 1)
 
    // dispatch event
    this.dispatch({
      type: ChatsEvent.REMOVED,
      data: chat
    })
  }
    
}
