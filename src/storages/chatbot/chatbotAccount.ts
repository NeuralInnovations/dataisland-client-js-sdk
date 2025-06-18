import { ChatbotAccountDto, KeyValueItem } from "../../dto/chatbotAccountResponse"



export type ChatbotAccountId = string;

export abstract class ChatbotAccount {

  abstract get data(): ChatbotAccountDto

  abstract update(name: string, token: string, accountContext: string, notificationDelays: number[], data: KeyValueItem[]): Promise<void>

}
