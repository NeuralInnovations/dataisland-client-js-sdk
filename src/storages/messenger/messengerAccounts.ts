import {MessengerAccount} from "./messengerAccount"


export abstract class MessengerAccounts {

  abstract get collection(): MessengerAccount[]

  abstract update(): Promise<void>

  abstract add(name: string, accountId: string, token: string, accountContext: string, referralUrl: string): Promise<void>

  abstract delete(id: string): Promise<void>
}
