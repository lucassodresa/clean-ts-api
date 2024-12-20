import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey/add-survey-controller'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { makeDbAddSurvey } from '../../../usecases/survey/add-survey/db-add-account-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const surveyControlller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  return makeLogControllerDecorator(surveyControlller)
}
