import { LoadSurveysRepository, LoadSurveysRepositoryResult } from '@/data/protocols'
import { LoadSurveys } from '@/domain/usecases'

export class DbLoadSurveys implements LoadSurveys {
  constructor (private readonly loadSurveysRepository: LoadSurveysRepository) {}

  async load (accountId: string): Promise<LoadSurveysRepositoryResult> {
    const surveys = await this.loadSurveysRepository.loadAll(accountId)
    return surveys
  }
}
