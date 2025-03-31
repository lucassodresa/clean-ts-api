
export type LoadAnswersBySurveyRepositoryResult = string[]
export interface LoadAnswersBySurveyRepository {
  loadAnswers (id: string): Promise<LoadAnswersBySurveyRepositoryResult>
}
