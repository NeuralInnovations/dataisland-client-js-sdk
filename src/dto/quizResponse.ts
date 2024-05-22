export interface QuizData{
  quiz: QuestionData[]
}

export interface QuestionData {
  question: string,
  options: string[],
  correct_option: number
}
