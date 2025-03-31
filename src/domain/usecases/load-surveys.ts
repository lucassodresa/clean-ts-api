import { SurveyModel } from '@/domain/models'

export type LoadSurveysResult = SurveyModel[]
export interface LoadSurveys {
  load (accountId: string): Promise<LoadSurveysResult>
}
