import {Context} from "../../context"
import {FlowId, QueryFlows, QueryFlowsEvent} from "./queryFlows"
import {QueryFlow} from "./queryFlow"
import {OrganizationImpl} from "../organizations/organization.impl"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import {WorkspaceId} from "../workspaces/workspaces"
import {
  QueryFlowListResponse,
  QueryFlowResponse,
  QueryFlowState
} from "../../dto/queryFlowResponse"
import {QueryFlowImpl} from "./queryFlow.impl"
import {UploadFile} from "../files/files"

export class QueryFlowsImpl extends QueryFlows {

  private _collection: QueryFlow[] = []

  private _inProgress: QueryFlow[] = []

  private _fetchTimeout?: NodeJS.Timeout

  constructor(
    public readonly organization: OrganizationImpl,
    public readonly context: Context) {
    super()
  }

  async getQueryFlows(): Promise<QueryFlow[]> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/QueryFlows/list")
      .searchParam("organizationId", this.organization.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to fetch query flows for org ${this.organization.id}`, response)
    }

    // parse flows from the server's response
    const flows = ((await response!.json()) as QueryFlowListResponse)
      .flowIds

    // Clear collection before add new elementss
    this._collection = []
    this._inProgress = []
    clearTimeout(this._fetchTimeout)

    // init flows from the server's response
    for (const flow of flows) {
      // create workspace implementation
      const flowImpl = new QueryFlowImpl(this.context)

      // init workspace from the server's response
      await flowImpl.initFrom(flow)

      if (flowImpl.state == QueryFlowState.IN_PROGRESS){
        this._inProgress.push(flowImpl)
      }

      // add workspace to the collection
      this._collection.push(flowImpl)
    }

    if (this._inProgress.length > 0) {
      this._fetchTimeout = setTimeout(async () => await this.internalFetchQueries(), 2000)
    }

    return this._collection
  }

  async internalFetchQueries() {
    for (const flow of this._inProgress){
      await flow.fetch()
    }

    this._inProgress = this._inProgress.filter(flow => flow.state == QueryFlowState.IN_PROGRESS)

    if (this._inProgress.length > 0) {
      this._fetchTimeout = setTimeout(async () => await this.internalFetchQueries(), 2000)
    } else {
      clearTimeout(this._fetchTimeout)
    }
  }

  async create(name: string, workspaceIds: WorkspaceId[], table: UploadFile): Promise<FlowId> {
    if (name === undefined || name === null || name.trim() === "") {
      throw new Error("Name is required, must be not empty")
    }
    if (workspaceIds === undefined || workspaceIds === null) {
      throw new Error("WorkspaceIds is required, must be not empty")
    }
    if (table === undefined || table === null) {
      throw new Error("Create query flow, table is undefined or null")
    }

    // form data to send
    const form = new FormData()
    form.append("organizationId", this.organization.id)
    form.append("name", name)
    form.append("tableFile", table, table.name)
    workspaceIds.forEach(item => {
      form.append("workspaceIds", item)
    })

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/QueryFlows")
      .sendPostFormData(form)

    // check response status
    if (ResponseUtils.isFail(response)) {

      await ResponseUtils.throwError(`Query flow creation for ${table.name}`, response)
    }

    const content = (await response!.json()) as QueryFlowResponse
    // create workspace implementation
    const queryFlow = new QueryFlowImpl(this.context)
    await queryFlow.initFrom(content.flowId)

    // add workspace to the collection
    this._collection.push(queryFlow)

    // dispatch event
    this.dispatch({
      type: QueryFlowsEvent.ADDED,
      data: queryFlow
    })

    return queryFlow.id
  }

  async delete(id: FlowId): Promise<void> {
    const flow = this._collection.find(flow => flow.id == id)

    if (!flow) {
      throw new Error(`Query flow ${id} is not found`)
    }

    // send delete request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/QueryFlows")
      .searchParam("flowId", id)
      .sendDelete()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Failed to delete query flow ${id} in organization: ${this.organization.id}`,
        response
      )
    }

    // remove query flow from the collection
    const index = this._collection.indexOf(flow)
    if (index < 0) {
      throw new Error(`Query flow ${id} is not found`)
    }
    this._collection.splice(index, 1)

    if (flow.state === QueryFlowState.IN_PROGRESS) {
      const progressIndex = this._inProgress.indexOf(flow)
      if (progressIndex < 0) {
        throw new Error(`Query flow ${id} is not found`)
      }
      this._inProgress.splice(progressIndex, 1)
    }

    // dispatch event
    this.dispatch({
      type: QueryFlowsEvent.REMOVED,
      data: flow
    })
  }

}
