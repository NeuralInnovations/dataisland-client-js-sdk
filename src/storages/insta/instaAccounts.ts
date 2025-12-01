
import { InstaErrorDto } from "../../dto/instaResponse"
import {InstaAccount, InstaVideoEditingSetting} from "./instaAccount"
import {InstaPost} from "./instaPost"


export abstract class InstaAccounts {

  abstract get accounts(): InstaAccount[]

  abstract get posts(): InstaPost[]

  abstract get errors(): InstaErrorDto[]

  abstract update(): Promise<void>

  abstract add(
    username: string, 
    password: string, 
    twoFactorKey: string, 
    proxy: string,
    additionalContext: string,
    conversationContext: string,
    folderId: string,
    postCron: string[],
    postTimezone: string,
    directCron: string[],
    directTimezone: string,
    videoEditingSetting?: InstaVideoEditingSetting
  ): Promise<void>

  abstract delete(id: string): Promise<void>

  abstract deletePost(id: string): Promise<void>

  abstract post(): Promise<void>

  abstract deleteError(id: string): Promise<void>

}
