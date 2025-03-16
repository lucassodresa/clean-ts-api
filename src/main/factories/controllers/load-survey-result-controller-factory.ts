import { makeDbLoadSurveyById, makeDbLoadSurveyResult, makeLogControllerDecorator } from '@/main/factories'
import { LoadSurveyResultController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeLoadSurveyResultController = (): Controller => {
  const surveyResultControlller = new LoadSurveyResultController(makeDbLoadSurveyById(), makeDbLoadSurveyResult())
  return makeLogControllerDecorator(surveyResultControlller)
}
