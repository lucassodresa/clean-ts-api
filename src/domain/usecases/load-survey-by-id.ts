import { SurveyModel } from '@/domain/models'

export type LoadSurveyByIdResult = SurveyModel

export interface LoadSurveyById {
  loadById (id: string): Promise<LoadSurveyByIdResult>
}
