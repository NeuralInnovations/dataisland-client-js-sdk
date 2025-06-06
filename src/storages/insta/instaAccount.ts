import {InstaAccountDto} from "../../dto/instaResponse"


export type InstaAccountId = string


export abstract class InstaAccount {

  abstract get id(): InstaAccountId

  abstract data(): Promise<InstaAccountDto>

  abstract update(
    enabled: boolean, 
    relogin: boolean, 
    username: string, 
    password: string, 
    twoFactorKey: string, 
    proxy: string,
    additionalContext: string,
    folderId: string,
    cron: string,
    timezone: string
  ): Promise<InstaAccountDto>

}

