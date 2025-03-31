import { SurveyResultModel } from '@/domain/models'

export type LoadSurveyResultRepositoryResult = SurveyResultModel
export interface LoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string, accountId: string) => Promise<LoadSurveyResultRepositoryResult>
}
