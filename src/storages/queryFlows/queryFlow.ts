import {EventDispatcher} from "../../events"
import {FlowId} from "./queryFlows"
import {QueryFlowStatus} from "../../dto/queryFlowResponse"

export enum QueryFlowEvent {
  UPDATED = "updated"
}

export abstract class QueryFlow extends EventDispatcher<
  QueryFlowEvent,
  QueryFlow
> {

  abstract get id(): FlowId

  abstract get name(): string

  abstract get status(): QueryFlowStatus

  abstract get resultUrl(): string

}
