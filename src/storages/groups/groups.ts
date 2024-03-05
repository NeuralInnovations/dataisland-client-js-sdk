import { EventDispatcher } from "../../events"
import { Group, GroupId } from "./group"

/**
 * Group event.
 */
export enum GroupsEvent {
  ADDED = "added",
  REMOVED = "removed",
  UPDATED = "updated"
}

/**
 * Groups storage.
 */
export abstract class Groups extends EventDispatcher<GroupsEvent, Group> {

  /**
   * Collection.
   */
  abstract get collection(): ReadonlyArray<Group>

  /**
   * Create new group.
   * @param name
   * @param permits
   * @param memberIds
   */
  abstract create(name: string, permits: {
    isAdmin: boolean
  }, memberIds: string[]): Promise<Group>

  /**
   * Get group by id.
   * @param id
   */
  abstract get(id: GroupId): Group | undefined

  /**
   * delete group by id.
   * @param id
   */
  abstract delete(id: GroupId): Promise<void>

}
