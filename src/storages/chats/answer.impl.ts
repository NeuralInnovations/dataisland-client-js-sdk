import { Context } from "../../context"
import { AnswerDto, AnswerStatus, AnswerStepDto, FetchAnswerResponse, FetchTokensResponse, SourceDto, StepType } from "../../dto/chatResponse"
import { ResponseUtils } from "../../services/responseUtils"
import { RpcService } from "../../services/rpcService"
import { Answer, AnswerId } from "./answer"
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

  async initFromData(answer: AnswerDto): Promise<AnswerImpl> {
    this._content = answer
    this._id = answer.id

    await this.fetch()

    return this
  }

  async initFromId(id: AnswerId): Promise<AnswerImpl> {
    this._id = id

    await this.fetch()

    return this
  }

  get id(): string {
    return <string>this._id
  }

  get status(): AnswerStatus {
    return <AnswerStatus>this._status
  }

  private getStep(type: StepType): AnswerStepDto | undefined {
    return this._steps?.find(step => step.type === type)
  }

  async sources(type: StepType): Promise<SourceDto[]> {
    await this.fetch()
    const step = this.getStep(type)

    if (!step){
      throw new Error(`Step with type ${type.toString()} is not found`)
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/answer/sources")
      .searchParam("chat_uid", this.chat.id)
      .searchParam("uid",this.id)
      .searchParam("step_id", step.id)
      .sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get sources for ${type.toString()}`, response)
    }

    const sources = (await response!.json()).sources as SourceDto[]

    return sources
  }

  async fetch(): Promise<void> {
    const position = 0
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/answer/fetch")
      .searchParam("chatId", this.chat.id)
      .searchParam("questionId",this.id)
      .searchParam("position", position.toString())
      .sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to fetch answer ${this.id}`, response)
    }

    const answer = (await response!.json()) as FetchAnswerResponse

    this._status = <AnswerStatus>answer.status
    this._steps = <AnswerStepDto[]>answer.steps

  }

  async fetch_tokens(type: StepType, token_start_at: number): Promise<FetchTokensResponse> {
    await this.fetch()
    const step = this.getStep(type)

    if (!step){
      throw new Error(`Step with type ${type.toString()} is not found`)
    }

    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/answer/fetch/tokens")
      .searchParam("chat_uid", this.chat.id)
      .searchParam("uid",this.id)
      .searchParam("step_id", step.id)
      .searchParam("token_start_at", token_start_at.toString())
      .sendGet()

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed to get sources for ${type.toString()}`, response)
    }

    const tokens = (await response!.json()) as FetchTokensResponse
    
    return tokens
  }


  async cancel(): Promise<void> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/answer/cancel")
      .sendPutJson({
        chat_id: this.chat.id,
        uid: this.id
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to cancel a question", response)
    }
  }
    
}