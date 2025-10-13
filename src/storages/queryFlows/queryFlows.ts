import {EventDispatcher} from "../../events"
import {QueryFlow} from "./queryFlow"
import {UploadFile} from "../files/files"
import { LibraryResource, SearchResource } from "../../dto/queryFlowResponse"


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

  abstract create(name: string, resources: SearchResource[], libraryResources: LibraryResource[], table: UploadFile ): Promise<FlowId>

  abstract delete(id: FlowId): Promise<void>

}
