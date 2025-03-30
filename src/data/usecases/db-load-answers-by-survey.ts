import { LoadSurveyByIdRepository } from '@/data/protocols'
import { LoadAnswersBySurvey, LoadAnswersBySurveyResult } from '@/domain/usecases'

export class DbLoadAnswersBySurvey implements LoadAnswersBySurvey {
  constructor (
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadAnswers (id: string): Promise<LoadAnswersBySurveyResult> {
    const survey = await this.loadSurveyByIdRepository.loadById(id)
    return survey?.answers.map(({ answer }) => answer) ?? []
  }
}
