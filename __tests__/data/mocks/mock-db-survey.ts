import { mockSurveyModel, mockSurveysModel } from '@/__tests__/domain/mocks'
import { AddSurveyRepository, CheckSurveyByIdRepository, CheckSurveyByIdRepositoryResult, LoadSurveyByIdRepository, LoadSurveyByIdRepositoryResult, LoadSurveysRepository } from '@/data/protocols'
import { SurveyModel } from '@/domain/models'
import { AddSurveyParams } from '@/domain/usecases'

export const mockAddSurveyRepository = (): AddSurveyRepository => {
  class AddSurveyRepositoryStub implements AddSurveyRepository {
    async add (surveyData: AddSurveyParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveyByIdRepository = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById (id: string): Promise<LoadSurveyByIdRepositoryResult> {
      return Promise.resolve(mockSurveyModel())
    }
  }
  return new LoadSurveyByIdRepositoryStub()
}

export const mockCheckSurveyByIdRepository = (): CheckSurveyByIdRepository => {
  class CheckSurveyByIdRepositoryStub implements CheckSurveyByIdRepository {
    async checkById (id: string): Promise<CheckSurveyByIdRepositoryResult> {
      return Promise.resolve(true)
    }
  }
  return new CheckSurveyByIdRepositoryStub()
}

export const mockLoadSurveysRepository = (): LoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements LoadSurveysRepository {
    async loadAll (): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveysModel())
    }
  }
  return new LoadSurveysRepositoryStub()
}
