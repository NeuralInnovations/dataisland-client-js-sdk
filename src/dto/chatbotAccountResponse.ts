


export enum ChatbotAccountType{
    Instagram = 0,
    Messenger = 1,
    Whatsapp = 2,
    Telegram = 3
}


export interface ChatbotAccountDto {
    id: string
    organizationId: string
    accountType: ChatbotAccountType
    name: string
    accountId: string
    token: string
    context: string
    apiKey: string
    notificationDelays: number[]
    data: KeyValueItem
}


export interface KeyValueItem {
    key: string
    value: string
}