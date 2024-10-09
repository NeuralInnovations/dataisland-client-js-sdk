import {EventDispatcher} from "../../events"
import {QueryFlow} from "./queryFlow"
import {WorkspaceId} from "../workspaces/workspaces"
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

  abstract getQueryFlows(): Promise<QueryFlow[]>

  abstract create(name: string, workspaceId: WorkspaceId, file: UploadFile, table: UploadFile ): Promise<FlowId>

  abstract delete(id: FlowId): Promise<void>

}
