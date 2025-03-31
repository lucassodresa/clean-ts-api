import { AddSurveyParams } from '@/domain/usecases'

export type AddSurveyRepositoryParams = AddSurveyParams
export interface AddSurveyRepository {
  add: (surveyData: AddSurveyRepositoryParams) => Promise<void>
}
