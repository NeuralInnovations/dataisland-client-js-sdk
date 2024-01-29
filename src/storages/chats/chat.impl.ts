import { Chat, ChatAnswerType } from "./chat"
import { Disposable } from "../../disposable"
import { Answer } from "./answer"
import { ChatDto } from "../../dto/chatResponse"
import { Context } from "../../context"


export class ChatImpl extends Chat implements Disposable {
  private readonly _answers: Answer[] = []

  private _content?: ChatDto


  constructor(private readonly context: Context) {
    super()
  }

  public initFrom(chat: ChatDto): ChatImpl {
    this._content = chat

       
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
  ask(message: string, answer: ChatAnswerType): Promise<Answer> {
    throw new Error("Method not implemented.")
  }
  delete(): Promise<void> {
    throw new Error("Method not implemented.")
  }
  cancel(): Promise<void> {
    throw new Error("Method not implemented.")
  }
  dispose(): void {
    throw new Error("Method not implemented.")
  }
    
}