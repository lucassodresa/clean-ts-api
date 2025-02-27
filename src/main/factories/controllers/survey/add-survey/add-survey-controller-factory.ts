import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAddSurvey } from '@/main/factories/usecases/survey/add-survey/db-add-account-factory'
import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '@/presentation/protocols'

export const makeAddSurveyController = (): Controller => {
  const surveyControlller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(surveyControlller)
}
