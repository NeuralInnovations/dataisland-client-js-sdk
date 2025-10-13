import {Context} from "../../context"
import {FlowId, QueryFlows, QueryFlowsEvent} from "./queryFlows"
import {QueryFlow} from "./queryFlow"
import {OrganizationImpl} from "../organizations/organization.impl"
import {RpcService} from "../../services/rpcService"
import {ResponseUtils} from "../../services/responseUtils"
import {
  LibraryResource,
  QueryFlowListResponse,
  QueryFlowResponse,
  SearchResource
} from "../../dto/queryFlowResponse"
import {QueryFlowImpl} from "./queryFlow.impl"
import {UploadFile} from "../files/files"

export class QueryFlowsImpl extends QueryFlows {

  private _collection: QueryFlow[] = []

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

    // init flows from the server's response
    for (const flow of flows) {
      // create workspace implementation
      const flowImpl = new QueryFlowImpl(this.context)

      // init query flow 
      flowImpl.initFrom(flow)

      // add query flow to the collection
      this._collection.push(flowImpl)
    }
    return this._collection
  }

  async create(name: string, resources: SearchResource[], libraryResources: LibraryResource[],  table: UploadFile): Promise<FlowId> {
    if (name === undefined || name === null || name.trim() === "") {
      throw new Error("Name is required, must be not empty")
    }
    if (resources === undefined || resources === null) {
      throw new Error("Resources is required, must be not empty")
    }
    if (libraryResources === undefined || libraryResources === null) {
      throw new Error("Library resources is required, must be not empty")
    }
    if (table === undefined || table === null) {
      throw new Error("Create query flow, table is undefined or null")
    }

    // form data to send
    const form = new FormData()
    form.append("organizationId", this.organization.id)
    form.append("name", name)
    form.append("tableFile", table, table.name)
    form.append("resources", JSON.stringify(resources))
    form.append("libraryResources", JSON.stringify(libraryResources))

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

    // dispatch event
    this.dispatch({
      type: QueryFlowsEvent.REMOVED,
      data: flow
    })
  }

}
