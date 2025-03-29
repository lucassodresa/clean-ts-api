import { SurveyModel } from '@/domain/models'

export type LoadSurveyByIdRepositoryResult = SurveyModel
export interface LoadSurveyByIdRepository {
  loadById (id: string): Promise<LoadSurveyByIdRepositoryResult>
}
