import { mockSurveysModel } from '@/__tests__/domain/mocks'
import { AddSurvey, AddSurveyParams, CheckSurveyById, CheckSurveyByIdResult, LoadAnswersBySurvey, LoadAnswersBySurveyResult, LoadSurveys, LoadSurveysResult } from '@/domain/usecases'

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
    async load (): Promise<LoadSurveysResult> {
      return Promise.resolve(mockSurveysModel())
    }
  }
  return new LoadSurveysStub()
}

export const mockLoadAnswersBySurvey = (): LoadAnswersBySurvey => {
  class LoadAnswersBySurveyStub implements LoadAnswersBySurvey {
    async loadAnswers (id: string): Promise<LoadAnswersBySurveyResult> {
      return Promise.resolve(['any_answer', 'other_answer'])
    }
  }
  return new LoadAnswersBySurveyStub()
}

export const mockCheckSurveyById = (): CheckSurveyById => {
  class CheckSurveyByIdStub implements CheckSurveyById {
    async checkById (id: string): Promise<CheckSurveyByIdResult> {
      return Promise.resolve(true)
    }
  }
  return new CheckSurveyByIdStub()
}
