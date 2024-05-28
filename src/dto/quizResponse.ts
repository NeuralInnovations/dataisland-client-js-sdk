import {SourceDto} from "./chatResponse"

export interface QuizData{
  quiz: QuestionData[]
  sources: SourceDto[]
}

export interface QuestionData {
  question: string,
  options: string[],
  correct_option: number
}
