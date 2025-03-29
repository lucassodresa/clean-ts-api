import { LoadSurveyByIdRepository } from '@/data/protocols'
import { LoadSurveyById, LoadSurveyByIdResult } from '@/domain/usecases'

export class DbLoadSurveyById implements LoadSurveyById {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadById (id: string): Promise<LoadSurveyByIdResult> {
    return this.loadSurveyByIdRepository.loadById(id)
  }
}
