import { Chat, ChatAnswerType } from "./chat"
import { Disposable } from "../../disposable"
import { Answer, AnswerId } from "./answer"
import {ChatDto, ChatResourceDto} from "../../dto/chatResponse"
import { Context } from "../../context"
import { AnswerImpl } from "./answer.impl"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"
import { Organization } from "../organizations/organization"

export class ChatImpl extends Chat implements Disposable {
  private _isDisposed: boolean = false
  private _answers: AnswerImpl[] = []

  private _content?: ChatDto

  constructor(
    private readonly context: Context,
    public readonly organization: Organization
  ) {
    super()
  }

  async initFrom(chat: ChatDto): Promise<ChatImpl> {
    this._content = chat

    this._answers = []
    // init answers
    for (const ans of chat.answers) {
      // create answer implementation
      const answer = new AnswerImpl(this, this.context).initFromHistory(ans)

      // add answer to the collection
      this._answers.push(answer)
    }

    return this
  }

  async update(): Promise<void> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats")
      .searchParam("id", this.id)
      .sendGet()

    // check response status
    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError(
        `Get chat for id ${this.id} is failed`,
        response
      )
    }

    // parse chat from the server's response
    const chat = (await response!.json() as { chat: ChatDto }).chat as ChatDto

    await this.initFrom(chat)
  }

  get id(): string {
    return <string>this._content?.id
  }

  get name(): string {
    return <string>this._content?.name
  }

  get resource(): ChatResourceDto {
    return  <ChatResourceDto>this._content?.resources
  }

  get model(): string {
    return <string>this._content?.model
  }

  get createAt(): number{
    return <number>this._content?.createdAt
  }

  get modifiedAt(): number{
    return <number>this._content?.modifiedAt
  }
  get clientContext(): string {
    return <string>this._content?.clientContext
  }

  get collection(): readonly Answer[] {
    return <Answer[]>this._answers
  }

  get isDisposed(): boolean {
    return this._isDisposed
  }

  public getAnswer(id: AnswerId): Answer {
    const answer = this._answers.find(answer => answer.id === id)
    if (answer) {
      return answer
    }
    throw new Error(`Answer with id ${id} is not found`)
  }

  async ask(message: string, answerType: ChatAnswerType): Promise<Answer | undefined> {

    // send request to the server
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/question")
      .sendPutJson({
        chatId: this.id,
        questionMessage: message,
        isLongAnswer: (answerType === ChatAnswerType.LONG)
      })

    // check response status
    if (ResponseUtils.isFail(response)) {
      if (await ResponseUtils.isLimitReached()){
        return undefined
      }
      await ResponseUtils.throwError(`Failed to ask a question, organization: ${this.organization.id}`, response)
    }

    // parse answer id from the server's response
    const id = (await response!.json() as { id: string }).id

    // create answer implementation
    const answer = await new AnswerImpl(this, this.context).initNew(id, message)

    // add answer to the collection
    this._answers.push(answer)

    return answer
  }



  dispose(): void {
    this._isDisposed = true
  }

}
