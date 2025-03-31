import { mockSurveyModel, mockSurveysModel } from '@/__tests__/domain/mocks'
import { AddSurveyRepository, CheckSurveyByIdRepository, CheckSurveyByIdRepositoryResult, LoadAnswersBySurveyRepository, LoadAnswersBySurveyRepositoryResult, LoadSurveyByIdRepository, LoadSurveyByIdRepositoryResult, LoadSurveysRepository } from '@/data/protocols'
import { AddSurveyParams, LoadSurveysResult } from '@/domain/usecases'

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

export const mockLoadAnswersBySurveyRepository = (): LoadAnswersBySurveyRepository => {
  class LoadAnswersBySurveyRepositoryStub implements LoadAnswersBySurveyRepository {
    async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepositoryResult> {
      return Promise.resolve([
        'any_answer_1',
        'any_answer_2'
      ])
    }
  }
  return new LoadAnswersBySurveyRepositoryStub()
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
    async loadAll (): Promise<LoadSurveysResult> {
      return Promise.resolve(mockSurveysModel())
    }
  }
  return new LoadSurveysRepositoryStub()
}
