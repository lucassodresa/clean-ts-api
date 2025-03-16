import { DbAddSurvey } from '@/data/usecases'
import { AddSurvey } from '@/domain/usecases'
import { SurveyMongoDbRepository } from '@/infra/db/mongodb'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbAddSurvey(surveyMongoDbRepository)
}
