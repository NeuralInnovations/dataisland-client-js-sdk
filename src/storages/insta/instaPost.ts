import {InstaContentDto, PostStatus} from "../../dto/instaResponse"


export type InstaPostId = string;

export abstract class InstaPost {

  abstract get id(): InstaPostId

  abstract get message(): string

  abstract get status(): PostStatus

  abstract get content(): InstaContentDto[]

  abstract update(): Promise<void>
}
