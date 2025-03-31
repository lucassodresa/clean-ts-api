
import { SurveyModel } from '@/domain/models'

export type LoadSurveysRepositoryResult = SurveyModel[]
export interface LoadSurveysRepository {
  loadAll: (accountId: string) => Promise<LoadSurveysRepositoryResult>
}
