import { Context } from "../../context"
import {
  AnswerDto,
  AnswerStatus,
  AnswerStepDto,
  FetchAnswerResponse,
  FetchTokensResponse,
  SourceDto,
  StepType
} from "../../dto/chatResponse"
import { ResponseUtils } from "../../services/responseUtils"
import { RpcService } from "../../services/rpcService"
import { Answer, AnswerEvent, AnswerId } from "./answer"
import { Chat } from "./chat"

export class AnswerImpl extends Answer {
  private _content?: AnswerDto

  private _steps?: AnswerStepDto[]
  private _status?: AnswerStatus
  private _id?: AnswerId

  constructor(
    private readonly chat: Chat,
    private readonly context: Context) {
    super()
  }

  initFromData(answer: AnswerDto): AnswerImpl {
    this._content = answer
    this._id = answer.id

    return this
  }

  async initFromId(id: AnswerId): Promise<AnswerImpl> {
    this._id = id

    // fetch answer
    await this.fetch()

    this.dispatch({
      type: AnswerEvent.ADDED,
      data: this
    })

    return this
  }

  get id(): string {
    return <string>this._id
  }

  get status(): AnswerStatus {
    return <AnswerStatus>this._status
  }

  get content(): AnswerDto {
    if (this.status != AnswerStatus.RUNNING){
      return <AnswerDto>this._content
    }
    throw new Error("Answer status is running, please use fetch() or fetch_tokens()")
  }

  private getStep(type: StepType): AnswerStepDto | undefined {
    return this._steps?.find(step => step.type === type)
  }

  async sources(type: StepType): Promise<SourceDto[]> {
    // fetch answer
    await this.fetch()
    // get step
    const step = this.getStep(type)

    // check step
    if (!step) {
      throw new Error(`Step with type ${type.toString()} is not found, answer: ${this.id}, organization: ${this.chat.organization.id}`)
    }

    // get sources
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/answer/sources")
      .searchParam("chat_uid", this.chat.id)
      .searchParam("uid", this.id)
      .searchParam("step_id", step.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get sources for ${type.toString()}, answer: ${this.id}, organization: ${this.chat.organization.id}`, response)
    }

    // parse sources from the server's response
    const sources = (await response!.json()).sources as SourceDto[]

    return sources
  }

  async fetch(): Promise<void> {
    // fetch answer from position 0
    const position = 0
    // fetch answer
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/answer/fetch")
      .searchParam("chatId", this.chat.id)
      .searchParam("questionId", this.id)
      .searchParam("position", position.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to fetch answer ${this.id}`, response)
    }

    // parse answer from the server's response
    const answer = (await response!.json()) as FetchAnswerResponse

    // update answer
    this._status = <AnswerStatus>answer.status
    this._steps = <AnswerStepDto[]>answer.steps

    this.dispatch({
      type: AnswerEvent.UPDATED,
      data: this
    })

    if (this._status != AnswerStatus.RUNNING){
      await this.chat.update()
    }
  }

  async fetchTokens(type: StepType, token_start_at: number): Promise<FetchTokensResponse> {
    // fetch answer
    await this.fetch()
    // get step
    const step = this.getStep(type)

    // check step
    if (!step) {
      throw new Error(`Step with type ${type.toString()} is not found`)
    }

    // get tokens
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/answer/fetch/tokens")
      .searchParam("chat_uid", this.chat.id)
      .searchParam("uid", this.id)
      .searchParam("step_id", step.id)
      .searchParam("token_start_at", token_start_at.toString())
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get sources for ${type.toString()}`, response)
    }

    // parse tokens from the server's response
    const tokens = (await response!.json()) as FetchTokensResponse

    return tokens
  }

  async cancel(): Promise<void> {
    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/answer/cancel")
      .sendPutJson({
        chat_id: this.chat.id,
        uid: this.id
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to cancel a question", response)
    }

    this.dispatch({
      type: AnswerEvent.CANCALLED,
      data: this
    })
  }
}
