import {MessengerAccountDto} from "../../dto/messengerResponse"


export type MessengerAccountId = string;

export abstract class MessengerAccount {

  abstract get id(): MessengerAccountId

  abstract get name(): string

  abstract data(): Promise<MessengerAccountDto>

  abstract update(name: string, token: string, language: string, accountContext: string, referralUrl: string, notificationDelays: number[]): Promise<MessengerAccountDto>

}
