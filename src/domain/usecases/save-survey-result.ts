import { SurveyResultModel } from '@/domain/models'

export type SaveSurveyResultParams = {
  surveyId: string
  accountId: string
  answer: string
  date: Date
}

export type SaveSurveyResultResult = SurveyResultModel
export type SaveSurveyResult = {
  save: (data: SaveSurveyResultParams) => Promise<SaveSurveyResultResult>
}
