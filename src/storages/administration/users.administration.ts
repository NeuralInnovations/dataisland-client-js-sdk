import {SearchUserResponse} from "../../dto/userInfoResponse"


export abstract class UsersAdministration {

  /*
  Search user by email
   */
  abstract search(email: string): Promise<SearchUserResponse>

  /*
  Set user segment
   */
  abstract setUserSegment(email: string, userId: string, segmentKey: string): Promise<void>
}
