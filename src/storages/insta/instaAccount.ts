import {InstaAccountDto} from "../../dto/instaResponse"


export type InstaAccountId = string


export abstract class InstaAccount {

  abstract get id(): InstaAccountId

  abstract data(): Promise<InstaAccountDto>

  abstract update(enabled: boolean, name: string, additionalContext: string, folderId: string, token: string, proxy: string): Promise<InstaAccountDto>

}

