import { AddSurveyRepository } from '@/data/protocols'
import { AddSurvey, AddSurveyParams } from '@/domain/usecases'

export class DbAddSurvey implements AddSurvey {
  constructor (
    private readonly addSurveyRepository: AddSurveyRepository
  ) {}

  async add (survey: AddSurveyParams): Promise<void> {
    await this.addSurveyRepository.add(survey)
  }
}
