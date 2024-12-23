import {Context} from "../../context"
import {
  AnswerDto, AnswerSourcesResponse,
  AnswerStatus,
  AnswerStepDto,
  FetchAnswerResponse,
  SourceDto,
  StepType
} from "../../dto/chatResponse"
import {ResponseUtils} from "../../services/responseUtils"
import {RpcService} from "../../services/rpcService"
import {Answer, AnswerEvent, AnswerId} from "./answer"
import {Chat} from "./chat"

export class AnswerImpl extends Answer {

  private _steps?: AnswerStepDto[]
  private _status?: AnswerStatus
  private _id?: AnswerId
  private _question?: string
  private _sources?: SourceDto[]
  private _answer?: string
  private _timestamp?: number

  constructor(
    private readonly chat: Chat,
    private readonly context: Context) {
    super()
  }

  initFromHistory(answer: AnswerDto): AnswerImpl {
    this._id = answer.id
    this._question = answer.question
    this._answer = answer.context
    this._sources = answer.sources
    this._timestamp = answer.timestamp

    return this
  }

  async initNew(id: AnswerId, question: string): Promise<AnswerImpl> {
    this._id = id
    this._question = question
    this._answer = ""

    await this.fetch()

    return this
  }

  get id(): AnswerId {
    return <AnswerId>this._id
  }

  get status(): AnswerStatus {
    return <AnswerStatus>this._status
  }

  get question(): string {
    return <string>this._question
  }

  get sources(): SourceDto[] {
    return <SourceDto[]>this._sources
  }

  get tokens(): string {
    return <string>this._answer
  }

  get timestamp(): number {
    return <number>this._timestamp
  }

  public fetchAfter() {
    if (this._status === undefined || this._status === AnswerStatus.RUNNING) {
      setTimeout(async () => await this.fetch(), 300)
    }
  }

  private getStep(type: StepType): AnswerStepDto | undefined {
    return this._steps?.find(step => step.type === type)
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

    if (this.status === AnswerStatus.CANCELED || this.status === AnswerStatus.FAIL){
      this.dispatch({
        type: AnswerEvent.UPDATED,
        data: this
      })
    }

    if (this.getStep(StepType.GENERATE_ANSWER) !== undefined) {
      const step = this.getStep(StepType.GENERATE_ANSWER)
      const step_tokens = step?.tokens.join("")
      if (this._answer !== step_tokens) {
        this._answer = step_tokens

        this.dispatch({
          type: AnswerEvent.UPDATED,
          data: this
        })
      }
    }

    if (this.getStep(StepType.SOURCES) !== undefined && this._sources === undefined) {
      const sources_step = this.getStep(StepType.SOURCES)
      this._sources = sources_step?.sources

      this.dispatch({
        type: AnswerEvent.UPDATED,
        data: this
      })
    }

    if (this.status === AnswerStatus.SUCCESS) {
      this.dispatch({
        type: AnswerEvent.UPDATED,
        data: this
      })

      const step = this.getStep(StepType.DONE)
      this._timestamp = Date.parse(step!.end_at)

      await this.chat.update()

    } else {
      this.fetchAfter()
    }
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

  async getAllSources(): Promise<SourceDto[]>{
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/answer/sources")
      .searchParam("chat_uid", this.chat.id)
      .searchParam("uid", this.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(`Failed get all sources for chat ${this.chat.id} answer ${this.id}`, response)
    }

    // parse sources from the server's response
    const sources = (await response!.json()) as AnswerSourcesResponse

    return sources.sources_all
  }
}
