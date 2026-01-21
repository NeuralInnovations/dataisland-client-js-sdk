import {ContentProvider, InstaAccountDto} from "../../dto/instaResponse"
import {UploadFile} from "../files/files"


export type InstaAccountId = string

export interface InstaVideoEditingSetting {
  minSpeedChange: number
  maxSpeedChange: number
  watermarkFile?: UploadFile
}


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
    conversationContext: string,
    folderId: string,
    contentProvider: ContentProvider,
    postCron: string[],
    postTimezone: string,
    directCron: string[],
    directTimezone: string,
    videoEditingSetting?: InstaVideoEditingSetting
  ): Promise<InstaAccountDto>

}

