import { LoadSurveyResultRepository, SurveyResultModel, LoadSurveyResult, LoadSurveyByIdRepository } from './db-load-survey-result-protocols'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async load (surveyId: string): Promise<SurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId)

    if (!surveyResult) {
      const { id, question, date, answers } = await this.loadSurveyByIdRepository.loadById(surveyId)

      return {
        surveyId: id,
        question: question,
        date: date,
        answers: answers.map(answer => ({
          ...answer,
          count: 0,
          percent: 0
        }))
      }
    }

    return surveyResult
  }
}
