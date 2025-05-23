import { makeAddSurveyValidation, makeDbAddSurvey, makeLogControllerDecorator } from '@/main/factories'
import { AddSurveyController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeAddSurveyController = (): Controller => {
  const surveyControlller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(surveyControlller)
}
