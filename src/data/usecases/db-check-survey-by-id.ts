import { CheckSurveyByIdRepository } from '@/data/protocols'
import { CheckSurveyById, CheckSurveyByIdResult } from '@/domain/usecases'

export class DbCheckSurveyById implements CheckSurveyById {
  constructor (
    private readonly checkSurveyByIdRepository: CheckSurveyByIdRepository
  ) {}

  async checkById (id: string): Promise<CheckSurveyByIdResult> {
    return this.checkSurveyByIdRepository.checkById(id)
  }
}
