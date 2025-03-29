import { DbCheckSurveyById } from '@/data/usecases'
import { CheckSurveyById } from '@/domain/usecases'
import { SurveyMongoDbRepository } from '@/infra/db/mongodb'

export const makeDbCheckSurveyById = (): CheckSurveyById => {
  const surveyMongoDbRepository = new SurveyMongoDbRepository()
  return new DbCheckSurveyById(surveyMongoDbRepository)
}
