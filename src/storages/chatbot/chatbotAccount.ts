import { KeyValueItem } from "../../dto/chatbotAccountResponse"



export type ChatbotAccountId = string;

export abstract class ChatbotAccount {

  abstract get id(): ChatbotAccountId

  abstract get name(): string

  abstract update(name: string, token: string, accountContext: string, notificationDelays: number[], data: KeyValueItem[]): Promise<void>

}
