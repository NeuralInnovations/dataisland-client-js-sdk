import {MessengerAccount} from "./messengerAccount"


export abstract class MessengerAccounts {

  abstract get collection(): MessengerAccount[]

  abstract update(): Promise<void>

  abstract add(name: string, accountId: string, token: string, language: string, accountContext: string, referralUrl: string, notificationDelays: number[]): Promise<void>

  abstract delete(id: string): Promise<void>
}
