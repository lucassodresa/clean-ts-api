import { AddSurvey, AddSurveyModel } from '../../../domain/usecases/add-survey'
import { AddSurveyRepository } from './db-add-survey-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (
    private readonly addSurveyRepository: AddSurveyRepository
  ) {}

  async add (survey: AddSurveyModel): Promise<void> {
    await this.addSurveyRepository.add(survey)
  }
}
