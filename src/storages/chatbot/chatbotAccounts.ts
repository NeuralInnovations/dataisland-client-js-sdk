import { ChatbotAccountType, KeyValueItem } from "../../dto/chatbotAccountResponse"
import { ChatbotAccount } from "./chatbotAccount"


export abstract class ChatbotAccounts {

  abstract get collection(): ChatbotAccount[]

  abstract update(): Promise<void>

  abstract add(type: ChatbotAccountType, name: string, accountId: string, token: string, accountContext: string, notificationDelays: number[], data: KeyValueItem[]): Promise<void>

  abstract delete(id: string): Promise<void>
}
