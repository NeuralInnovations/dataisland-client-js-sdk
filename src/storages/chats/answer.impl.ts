import { Context } from "../../context"
import { AnswerDto, SourceDto } from "../../dto/chatResponse"
import { Answer } from "./answer"


export class AnswerImpl extends Answer {

  private _content?: AnswerDto

  constructor(private readonly context: Context) {
    super()
  }

  public initFrom(answer: AnswerDto): AnswerImpl {
    this._content = answer

    return this
  }

  get id(): string {
    return <string>this._content?.id
  }
  get sources(): SourceDto[] {
    return <SourceDto[]>this._content?.sources
  }
  fetch(startAt: number): Promise<void> {
    throw new Error("Method not implemented.")
  }
  fetch_tokens(stepId: string, tokensStartAt: number): Promise<void> {
    throw new Error("Method not implemented.")
  }
    
}