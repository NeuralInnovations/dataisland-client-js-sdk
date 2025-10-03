import { QueryFlow, QueryFlowEvent } from "./queryFlow"
import {
  QueryFileUrlDto,
  QueryFlowDto,
  QueryFlowState
} from "../../dto/queryFlowResponse"
import { FlowId } from "./queryFlows"
import { Context } from "../../context"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"

export class QueryFlowImpl extends QueryFlow {
  private _content?: QueryFlowDto
  private _id?: FlowId

  private _fetchTimeout?: NodeJS.Timeout

  constructor(private readonly context: Context) {
    super()
  }

  initFrom(id: FlowId) {
    this._id = id
  }

  async fetch() {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/QueryFlows")
      .searchParam("flowId", this.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to fetch query flow with id ${this.id}`, response)
    }

    clearTimeout(this._fetchTimeout)

    // parse flow from the server's response
    const flow = (await response!.json()) as QueryFlowDto

    const lastState = this._content

    this._content = flow
    if (lastState !== undefined && 
      (lastState.state !== this.state || lastState.completedRowsCount !== this._content.completedRowsCount)) {
      this.dispatch({
        type: QueryFlowEvent.UPDATED,
        data: this
      })
    }

    if (this.state === QueryFlowState.IN_QUEUE || this.state === QueryFlowState.IN_PROGRESS || this.state === QueryFlowState.ANALYTICS){
      this._fetchTimeout = setTimeout(async () => await this.fetch(), 2000)
    }
  }

  get id(): FlowId {
    if (this._id) {
      return this._id
    } else {
      throw new Error("Query flow is not loaded")
    }
  }

  get name(): string {
    if (this._content) {
      return this._content.name
    } else {
      throw new Error("Query flow is not loaded")
    }
  }

  get userId(): string {
    if (this._content) {
      return this._content.userId
    } else {
      throw new Error("Query flow is not loaded")
    }
  }

  get createdAt(): number {
    if (this._content) {
      return this._content.createdAt
    } else {
      throw new Error("Query flow is not loaded")
    }
  }


  get modifiedAt(): number {
    if (this._content) {
      return this._content.modifiedAt
    } else {
      throw new Error("Query flow is not loaded")
    }
  }

  get error(): string {
    if (this._content) {
      return this._content.error
    } else {
      throw new Error("Query flow is not loaded")
    }
  }

  get progress(): number {
    if (this._content) {
      return this._content.completedRowsCount / this._content.totalRowsCount
    } else {
      throw new Error("Query flow is not loaded")
    }
  }

  get urls(): QueryFileUrlDto[] | undefined {
    if (this._content && this._content.result.files) {
      return this._content.result.files
    } else {
      throw new Error("Query fLow is not loaded")
    }
  }

  get state(): QueryFlowState {
    if (this._content) {
      return this._content.state
    } else {
      throw new Error("Query fLow is not loaded")
    }
  }


}
