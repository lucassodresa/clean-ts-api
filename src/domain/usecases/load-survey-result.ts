import { SurveyResultModel } from '@/domain/models'

export type LoadSurveyResultResult = SurveyResultModel
export type LoadSurveyResult = {
  load (surveyId: string, accountId: string): Promise<LoadSurveyResultResult>
}
