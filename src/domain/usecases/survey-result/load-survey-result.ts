import { SurveyResultModel } from '@/domain/models/survey-result'

export type LoadSurveyResult = {
  save (surveyId: string): Promise<SurveyResultModel>
}
