
import {InstaAccount} from "./instaAccount"
import {InstaPost} from "./instaPost"


export abstract class InstaAccounts {

  abstract get accounts(): InstaAccount[]

  abstract get posts(): InstaPost[]

  abstract update(): Promise<void>

  abstract add(
    username: string, 
    password: string, 
    twoFactorKey: string, 
    proxy: string,
    additionalContext: string,
    folderId: string
  ): Promise<void>

  abstract delete(id: string): Promise<void>

  abstract deletePost(id: string): Promise<void>

  abstract post(message: string): Promise<void>

}
