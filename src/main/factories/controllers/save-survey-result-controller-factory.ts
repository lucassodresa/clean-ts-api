import { makeDbLoadSurveyById, makeDbSaveSurveyResult, makeLogControllerDecorator } from '@/main/factories'
import { SaveSurveyResultController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSaveSurveyResultController = (): Controller => {
  const surveyResultControlller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(surveyResultControlller)
}
