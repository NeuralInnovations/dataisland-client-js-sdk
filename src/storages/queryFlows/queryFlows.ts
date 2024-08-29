import {EventDispatcher} from "../../events"
import {QueryFlow} from "./queryFlow"
import {WorkspaceId} from "../workspaces/workspaces"
import {FileId} from "../files/file"
import {UploadFile} from "../files/files"


/**
 * Query flow id.
 */
export type FlowId = string

/**
 * Query flow event.
 */
export enum QueryFlowsEvent {
  ADDED = "added",
  REMOVED = "removed"
}

export abstract class QueryFlows extends EventDispatcher<
  QueryFlowsEvent,
  QueryFlow
> {

  abstract get collection(): QueryFlow[]

  abstract create(name: string, workspaceId: WorkspaceId, fileId: FileId, file: UploadFile ): Promise<FlowId>

  abstract delete(id: FlowId): Promise<void>

}
