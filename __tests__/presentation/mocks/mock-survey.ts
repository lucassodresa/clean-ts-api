import { mockSurveyModel, mockSurveysModel } from '@/__tests__/domain/mocks'
import { SurveyModel } from '@/domain/models'
import { AddSurvey, AddSurveyParams, CheckSurveyById, CheckSurveyByIdResult, LoadSurveyById, LoadSurveys } from '@/domain/usecases'

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (survey: AddSurveyParams): Promise<void> {
      return Promise.resolve()
    }
  }
  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async load (): Promise<SurveyModel[]> {
      return Promise.resolve(mockSurveysModel())
    }
  }
  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel> {
      return Promise.resolve(mockSurveyModel())
    }
  }
  return new LoadSurveyByIdStub()
}

export const mockCheckSurveyById = (): CheckSurveyById => {
  class CheckSurveyByIdStub implements CheckSurveyById {
    async checkById (id: string): Promise<CheckSurveyByIdResult> {
      return Promise.resolve(true)
    }
  }
  return new CheckSurveyByIdStub()
}
