import { EventDispatcher } from "../../events"
import { FlowId } from "./queryFlows"
import {
  QueryFileUrlDto,
  QueryFlowState
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

  abstract get userId(): string

  abstract get createdAt(): number

  abstract get modifiedAt(): number

  abstract get state(): QueryFlowState

  abstract get error(): string

  abstract get progress(): number

  abstract get urls(): QueryFileUrlDto[] | undefined

  abstract fetch(): any

}
