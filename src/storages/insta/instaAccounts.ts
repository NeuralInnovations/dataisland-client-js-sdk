
import {InstaAccount} from "./instaAccount"
import {InstaPost} from "./instaPost"


export abstract class InstaAccounts {

  abstract get accounts(): InstaAccount[]

  abstract get posts(): InstaPost[]

  abstract update(): Promise<void>

  abstract add(name: string, token: string, accountId: string, proxy: string, additionalContext: string, folderId: string): Promise<void>

  abstract delete(id: string): Promise<void>

  abstract deletePost(id: string): Promise<void>

  abstract post(message: string): Promise<void>

}
