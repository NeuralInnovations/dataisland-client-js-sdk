import {PostStatus} from "../../dto/instaResponse"


export type InstaPostId = string;

export abstract class InstaPost {

  abstract get id(): InstaPostId

  abstract get message(): string

  abstract get status(): PostStatus

  abstract get postsLeft(): number

  abstract update(): Promise<void>
}
