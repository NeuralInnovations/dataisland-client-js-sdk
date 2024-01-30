import { Chat, ChatAnswerType } from "./chat"
import { Disposable } from "../../disposable"
import { Answer } from "./answer"
import { ChatDto } from "../../dto/chatResponse"
import { Context } from "../../context"
import { AnswerImpl } from "./answer.impl"
import { RpcService } from "../../services/rpcService"
import { ResponseUtils } from "../../services/responseUtils"


export class ChatImpl extends Chat implements Disposable {
  private _isDisposed: boolean = false
  private readonly _answers: Answer[] = []

  private _content?: ChatDto


  constructor(private readonly context: Context) {
    super()
  }

  async initFrom(chat: ChatDto): Promise<ChatImpl> {
    this._content = chat

    for (const ans of chat.answers){
      const answer = await new AnswerImpl(this, this.context).initFromData(ans)

      this._answers.push(answer)
    }
       
    return this
  }

  get id(): string {
    return <string>this._content?.id
  }
  get name(): string {
    return <string>this._content?.name
  }
  get collection(): readonly Answer[] {
    return this._answers
  }
  get isDisposed(): boolean {
    return this._isDisposed
  }

  async ask(message: string, answerType: ChatAnswerType): Promise<Answer> {
    const response = await this.context
      .resolve(RpcService)
      ?.requestBuilder("api/v1/Chats/question")
      .sendPutJson({
        chatId: this.id,
        questionMessage: message,
        isLongAnswer: ( answerType === ChatAnswerType.LONG )
      })

    if (ResponseUtils.isFail(response)) {
      await ResponseUtils.throwError("Failed to ask a question", response)
    }

    const id = (await response!.json()).id

    const answer = await new AnswerImpl(this, this.context).initFromId(id)

    this._answers.push(answer)

    return answer
  }

  dispose(): void {
    this._isDisposed = true
  }
    
}