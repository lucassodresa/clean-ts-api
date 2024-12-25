import { DbAddSurvey } from '@/data/usecases/survey/add-survey/db-add-survey'
import { AddSurvey } from '@/domain/usecases/survey/add-survey'
import { SurveyMongoDbRepository } from '@/infra/db/mongodb/survey/survey-mongodb-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbAddSurvey(surveyMongoDbRepository)
}
