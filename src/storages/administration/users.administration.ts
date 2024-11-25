import {SearchUserResponse} from "../../dto/userInfoResponse"


export abstract class UsersAdministration {

  /*
  Search user by email
   */
  abstract search(query: string | undefined, email: string | undefined, userId: string | undefined): Promise<SearchUserResponse>

  /*
  Set user segment
   */
  abstract setUserSegment(email: string, userId: string, segmentKey: string): Promise<void>
}
