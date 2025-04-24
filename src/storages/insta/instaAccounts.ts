import {
  InstaPostResult
} from "../../dto/instaResponse"
import {InstaAccount} from "./instaAccount"


export abstract class InstaAccounts {

  abstract get collection(): InstaAccount[]

  abstract update(): Promise<void>

  abstract add(name: string, token: string, accountId: string, additionalContext: string, folderId: string): Promise<void>

  abstract delete(id: string): Promise<void>

  abstract post(message: string): Promise<InstaPostResult>

}
