import { mockSurveyResultModel } from '@/__tests__/domain/mocks'
import { LoadSurveyResult, LoadSurveyResultResult, SaveSurveyResult, SaveSurveyResultParams, SaveSurveyResultResult } from '@/domain/usecases'

export const mockSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async save (data: SaveSurveyResultParams): Promise<SaveSurveyResultResult> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new SaveSurveyResultStub()
}

export const mockLoadSurveyResult = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async load (surveyId: string, accountId: string): Promise<LoadSurveyResultResult> {
      return Promise.resolve(mockSurveyResultModel())
    }
  }
  return new LoadSurveyResultStub()
}
