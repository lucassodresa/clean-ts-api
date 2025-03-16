import { makeLogControllerDecorator, makeDbLoadSurveyById, makeDbLoadSurveyResult } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoadSurveyResultController } from '@/presentation/controllers'

export const makeLoadSurveyResultController = (): Controller => {
  const surveyResultControlller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(surveyResultControlller)
}
