
export type LoadAnswersBySurveyResult = string[]

export interface LoadAnswersBySurvey {
  loadAnswers (id: string): Promise<LoadAnswersBySurveyResult>
}
