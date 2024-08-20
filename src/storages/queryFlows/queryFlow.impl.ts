import {QueryFlow, QueryFlowEvent} from "./queryFlow"
import {QueryFlowDto, QueryFlowStatus} from "../../dto/queryFlowResponse"
import {FlowId} from "./queryFlows"
import {Context} from "../../context"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"


export class QueryFlowImpl extends QueryFlow {
  private _content?: QueryFlowDto
  private _id?: FlowId

  constructor(private readonly context: Context) {
    super()
  }

  async initFrom(id: FlowId) {
    this._id = id
    await this.fetch()
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

    // parse flow from the server's response
    const flow = (await response!.json()) as QueryFlowDto

    const lastState = this._content?.state

    this._content = flow
    if (lastState !== undefined && lastState !== this._content.state){
      this.dispatch({
        type: QueryFlowEvent.UPDATED,
        data: this
      })
    }

    if (this._content.state === QueryFlowStatus.IN_PROGRESS) {
      setTimeout(async () => await this.fetch(), 2000)
    }
  }


  get id(): FlowId {
    if (this._id)
      return this._id
    else
      throw new Error("Query fLow is not loaded")
  }

  get resultUrl(): string {
    if (this._content && this._content.result.fileUrl)
      return this._content.result.fileUrl
    else
      throw new Error("Query fLow is not loaded")
  }

  get status(): QueryFlowStatus {
    if (this._content)
      return this._content.state
    else
      throw new Error("Query fLow is not loaded")
  }

}
