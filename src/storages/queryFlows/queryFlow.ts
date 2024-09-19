import { EventDispatcher } from "../../events"
import { FlowId } from "./queryFlows"
import {
  QueryFileUrlDto,
  QueryFlowState,
  QueryFlowStatus
} from "../../dto/queryFlowResponse"

export enum QueryFlowEvent {
  UPDATED = "updated"
}

export abstract class QueryFlow extends EventDispatcher<
  QueryFlowEvent,
  QueryFlow
> {

  abstract get id(): FlowId

  abstract get name(): string

  abstract get state(): QueryFlowState

  abstract get status(): QueryFlowStatus

  abstract get urls(): QueryFileUrlDto[] | undefined

}
