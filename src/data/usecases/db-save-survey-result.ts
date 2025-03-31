import { LoadSurveyResultRepository, SaveSurveyResultRepository } from '@/data/protocols'
import { SaveSurveyResult, SaveSurveyResultParams, SaveSurveyResultResult } from '@/domain/usecases'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor (
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository

  ) {}

  async save (data: SaveSurveyResultParams): Promise<SaveSurveyResultResult> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId)
    return surveyResult
  }
}
