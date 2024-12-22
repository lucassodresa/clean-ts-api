import { SurveyMongoDbRepository } from '../../../../../infra/db/mongodb/survey/survey-mongodb-repository'
import { LoadSurveys } from '../../../../../domain/usecases/load-surveys'
import { DbLoadSurveys } from '../../../../../data/usecases/load-surveys/db-load-surveys'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbLoadSurveys(surveyMongoDbRepository)
}
