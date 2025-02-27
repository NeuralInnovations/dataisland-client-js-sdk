
import {ChatCount, ChatListResponse} from "../../dto/chatResponse"

export abstract class ChatsAdministration {

  /*
  Get user chats
  */
  abstract userChats(userId: string, organizationId: string, limit: number, page: number): Promise<ChatListResponse>

  /*
  Send Message to chat
   */
  abstract sendMessageToChat( chatId: string, message: string): Promise<void>
  
  /*
  Send Message to users
   */
  abstract sendMessageToUsers( message: string, organizationIdFilter: string, platformFilter: number, activityInMinutesFilter: number, stageFilter: number ): Promise<ChatCount>
}
