import { LoadSurveyByIdRepository, LoadSurveyResultRepository } from '@/data/protocols'
import { LoadSurveyResult, LoadSurveyResultResult } from '@/domain/usecases'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string, accountId: string): Promise<LoadSurveyResultResult> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accountId)

    if (!surveyResult) {
      const { id, question, date, answers } = await this.loadSurveyByIdRepository.loadById(surveyId)

      return {
        surveyId: id,
        question: question,
        date: date,
        answers: answers.map(answer => ({
          ...answer,
          count: 0,
          percent: 0,
          isCurrentAccountAnswer: false
        }))
      }
    }

    return surveyResult
  }
}
