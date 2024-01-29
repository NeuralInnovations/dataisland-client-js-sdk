import { Context } from "../../context"
import { ChatDto } from "../../dto/chatResponse"
import { ResponseUtils } from "../../services/responseUtils"
import { RpcService } from "../../services/rpcService"
import { OrganizationImpl } from "../organizations/organization.impl"
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

  get collection(): readonly Chat[] {
    return this._chats
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

  get(id: string): Chat {
    return <Chat>this.tryGet(id)
  }

  tryGet(id: string): Chat | undefined {
    return this._chats.find(chat => chat.id === id)
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
 
     // remove workspace from the collection
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
